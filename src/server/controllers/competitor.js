const { prisma } = require('../utils/prisma');

const createCompetitor = async (req, res) => {
    const { name, nationality, email, imageUrl, competitionId } = req.body;
    const createdCompetitor = await prisma.competitor.create({
        data: {
            name: name,
            nationality: nationality,
            email: email,
            competitorImageUrl: imageUrl,
            competition: {
                connect: {
                    id: competitionId
                }
            }
        }
    });

    return res.json({ data: createdCompetitor });
}

const deleteCompetitorById = async (req, res) => {
    const { id } = req.body
    const deletedCompetitor = await prisma.competitor.delete({
        where: {
            id: Number(id)
        }
    });

    return res.json({ data: deletedCompetitor });
}


module.exports = {
    createCompetitor,
    deleteCompetitorById
}