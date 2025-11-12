const { PrismaClient } = require("../generated/prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

exports.displayCreateCompany = (req, res) => {
    res.render("pages/createCompany.twig", {
        title: "Ajouter une entreprise"
    })
}

exports.displayLogin = (req, res) => {
    res.render("/pages/login.twig", {
        title: "Connexion"
    })
}

exports.displayHome = async (req, res) => {
    const employees = await prisma.employee.findMany({
        where: {
            companyId: req.session.company.id
        }
    })
    res.render("pages/home.twig", {
        title: "Accueil",
        connected: true,
        company: req.session.company,
        listEmployees: employees
    })
}

exports.createCompany = async (req, res) => {
    console.log("Création demandée")
    try {
        if (req.body.password == req.body.confirm) {
            const company = await prisma.company.create({
                data: {
                    name: req.body.name,
                    siret: BigInt(req.body.siret),
                    password: await bcrypt.hash(req.body.password, 12),
                    owner: req.body.owner,
                }
            })

            req.session.company = {
                id: company.id,
                name: company.name,
                siret: company.siret.toString(),
                owner: company.owner
            }
        }
        else {
            console.log("Les mots de passe ne correspondent pas")
            const error = new Error("Données non valides")
            error.confirm = error.message
            throw error
        }

        res.redirect("/home")
    } catch (error) {
        console.log(error);
        res.render("pages/createCompany.twig", {
            title: "Ajouter une entreprise",
            error: error
        })
    }
}

// Traite la soumission du formulaire de connexion
exports.login = async (req, res) => {
    try {
        // Recherche l'utilisateur en base par son email
        const company = await prisma.company.findUnique({
            where: {
                siret: parseInt(req.body.siret)
            }
        })

        if (company) {
            // Si l'utilisateur existe, on compare le mot de passe fourni avec le hash stocké
            if (bcrypt.compareSync(req.body.password, company.password)) {
                req.session.company = {
                    id: company.id,
                    name: company.name,
                    siret: company.siret.toString(),
                    owner: company.owner
                }
                // Redirige vers la page d'accueil
                res.redirect('/home')
            } else {
                // Si le mot de passe est incorrect, on lève une erreur personnalisée
                throw { password: "Mauvais mot de passe" }
            }
        } else {
            // Si l'utilisateur n'existe pas, on lève une erreur personnalisée
            throw { siret: "Ce numéro de siret n'est pas enregistré" }
        }
    } catch (error) {
        // Affiche les erreurs dans la vue login
        res.render("pages/login.twig", {
            error: error,
            title: "Connexion"

        })
    }
}


exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}
