
// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'INSERT INTO `user`(`username`,`password`) VALUES (?,?)',
    login:"SELECT `password` FROM `user` WHERE username = ? AND `password` = ?",
    select:"SELECT * FROM USER WHERE username = ? AND PASSWORD = ?",
    query:"SELECT * FROM student",
    delete:"DELETE FROM student WHERE id = ?",
    addStudent:"INSERT INTO student(`user1`,`studentName`,`studentPwd`,`Content`) VALUES (?,?,?,?)",
    selectStudent:"SELECT * FROM student WHERE studentName = ?",
    update:"UPDATE student SET studentName = ?,studentPwd = ?,Content = ? WHERE id = ?"
  }
}
module.exports = sqlMap;
