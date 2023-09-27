const connection = require("../configs/MySQLConnect");

class PermissionRepository {
    static async insertPermission(canRead, canWrite) {
        const query = `INSERT INTO permissions (canRead, canWrite) 
        VALUES (?, ?)`;
        const params = [canRead, canWrite]
        const result = await connection.query(query, params);
        return result.insertId;
    }

    static async UpdateUserAccountPermission(canRead, canWrite, id) {
        const query = `UPDATE permissions SET canRead = ? , canWrite = ? WHERE id = ? `;
        const params = [canRead,canWrite,id];
        const result = await connection.query(query,params);
        return result;
    }

    static async DeletePermission(id) {
        const query = `DELETE FROM permissions WHERE id = ?`;
        const params = [id];
        const result = await connection.query(query,params);
        return result;
    }
}

module.exports = PermissionRepository;