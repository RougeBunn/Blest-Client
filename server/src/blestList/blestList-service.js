const xss = require('xss');

const BlestListService = {
  getById(db, id) {
    return db
      .from('blest_list AS list')
      .select(
        'list.id',
        'list.blessing',
        'list.date_created',
        'list.author_id',
        db.raw(
          `json_strip_nulls(
                row_to_json(
                    (SELECT tmp FROM (
                        SELECT
                          usr.id,
                          usr.user_name,
                          usr.full_name,
                          usr.date_created,
                          usr.date_modified
                    ) tmp)
                )
            ) AS "user"`
        )
      )
      .leftJoin('blest_users AS usr', 'list.author_id', 'usr.id')
      .where('list.id', id)
      .first();
  }
};

module.exports = BlestListService;
