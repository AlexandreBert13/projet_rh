const { PrismaClient } = require("../generated/prisma/client")
const prisma = new PrismaClient()

exports.displayComputer = async (req, res) => {
    try {
        const listComputers = await prisma.computer.findMany({
            where: {
                companyId: parseInt(req.session.company.id)
            },
            include: {
                employee: true
            }
        });

        const listEmployees = await prisma.employee.findMany({
            where: {
                companyId: parseInt(req.session.company.id)
            }
        });

        res.render("pages/displayComputer.twig", {
            title: "Liste des ordinateurs",
            connected: true,
            company: req.session.company,
            listComputers,
            listEmployees
        });
    } catch (error) {
        res.render("pages/displayComputer.twig", {
            title: "Liste des ordinateurs",
            connected: true,
            company: req.session.company,
            listComputers: [],
            listEmployees: [],
            error: "Erreur lors de la récupération des ordinateurs"
        });
    }
};

exports.addComputer = async (req, res) => {
    try {
        await prisma.computer.create({
            data: {
                macAddress: req.body.macAddress,
                companyId: parseInt(req.session.company.id),
                employeeId: req.body.employeeId ? parseInt(req.body.employeeId) : null
            }
        });

        res.redirect("/displayComputer");
    } catch (error) {
        console.log(error);

        const listEmployees = await prisma.employee.findMany({
            where: {
                companyId: parseInt(req.session.company.id)
            }
        });

        res.redirect("/displayComputer");
    }
};

exports.deleteComputer = async (req, res) => {
    try {
        const deleteComputer = await prisma.computer.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.redirect("/displayComputer")
    } catch (error) {
        req.session.errorRequest = "L'ordinateur n'a pas pu etre supprimé"
        res.redirect("/displayComputer")
    }
}

exports.updateComputer = async (req, res) => {
    try {
        const updateComputer = await prisma.computer.update({
            where: { 
                id: parseInt(req.params.id)
            },
            data: {
                macAddress: req.body.macAddress,
                companyId: req.session.company.id,
                employeeId: parseInt(req.body.employeeId) || null 
            }
        });
        
        const listComputers = await prisma.computer.findMany({
            where: {
                companyId: req.session.company.id 
            }
        });
        res.redirect("/displayComputer")
    } catch (error) {
        console.log(error);
        res.redirect("/displayComputer")
    }
};