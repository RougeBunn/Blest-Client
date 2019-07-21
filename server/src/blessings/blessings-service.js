const xss = require('xss');

const BlessingsService = {
  createBlessing(db, blessingRequestBody) {
    const blessingBody = {
      blessing: blessingRequestBody.blessing,
      author_id: blessingRequestBody.userId
    };
    return db
      .table('blest_list')
      .insert(blessingBody)
      .returning('*');
  },
  deleteBlessing(db, blessingId) {
    return db
      .table('blest_list')
      .where({ id: blessingId })
      .del();
  },
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
  },

  serializeComment(blessing) {
    const { user } = blessing;
    return {
      id: blessing.id,
      text: xss(blessing.text),
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      }
    };
  }
};
module.exports = BlessingsService;
