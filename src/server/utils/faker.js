const { faker } = require('@faker-js/faker');


const createFakeAdmin = () => {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const email = faker.internet.email(username);

    return { username, password, email }
}

const createFakeCompetition = () => {
    const title = faker.lorem.sentence();

    return { title, }
}

const createFakeSeason = () => {
    const title = faker.lorem.sentence();

    return { title }
}

const createFakeRound = () => {
    const title = faker.lorem.sentence();

    return { title }
}

const createFakeCompetitor = () => {
    const name = faker.name.firstName();
    const nationality = faker.address.country();
    const email = faker.internet.email();
    const competitorImage = faker.internet.avatar();

    return { name, nationality, email, competitorImage }
}

const createFakePositionMapping = (position, mapping) => {
    //temporary
    return { position, mapping }
}

const createFakeTeam = () => {
    const name = faker.lorem.sentence();

    return { name }
}

const createFakePlacement = (availablePositions) => {
    const position = faker.datatype.number({ max: availablePositions.length });

    return { position }
}

console.log(createFakePlacement([1, 2, 3, 4, 5]));

module.exports = {
    createFakeAdmin,
    createFakeCompetition,
    createFakeSeason,
    createFakeRound,
    createFakeCompetitor,
    createFakeTeam,
    createFakePositionMapping,
    createFakePlacement
}