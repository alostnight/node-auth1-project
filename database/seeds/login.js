exports.seed = function(knex) {
    return knex('users').insert([
        {
            username: 'alostnight',
            password: 'futureisnow'
        }
    ])
}