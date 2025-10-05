const { PrismaClient } = require("../generated/prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

exports.displayAddEmployee = (req, res) => {
    res.render("pages/addEmployee.twig", {
        title: "Ajouter un employé",
        connected: true,
        company: req.session.company
    })
}

exports.addEmployee = async (req, res) => {
    try {
        if (req.body.password == req.body.confirm) {
            const employee = await prisma.employee.create({
                data: {
                    lastName: req.body.lastName,
                    firstName: req.body.firstName,
                    mail: req.body.mail,
                    password: await bcrypt.hash(req.body.password, 12),
                    age: parseInt(req.body.age),
                    gender: req.body.gender,
                    companyId: req.session.company.id
                }
            })
            res.redirect("/home")
        } else {
            const error = new Error("Données non valides")
            error.confirm = error.message
            throw error
        }
    } catch (error) {
        console.log(error);
        res.redirect("/addEmployee")
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        const deleteEmployee = await prisma.employee.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.redirect("/home")
    } catch (error) {
        req.session.errorRequest = "L'employé n'a pas pu etre supprimé"
        res.redirect("/home")
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        const updateEmployee = await prisma.employee.update({
            where: { 
                id: parseInt(req.params.id)
            },
            data: {
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                mail: req.body.mail,
                age: parseInt(req.body.age),
                gender: req.body.gender,
            }
        });
        // Recharge la liste des employés pour l'affichage
        const listEmployees = await prisma.employee.findMany({
            where: {
                companyId: req.session.company.id 
            }
        });
        res.redirect("/home")
    } catch (error) {
        console.log(error);
        res.redirect("/home")
    }
};