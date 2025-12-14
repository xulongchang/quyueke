// mock/login.js
export default {
  'POST /api/login': (req, res) => {
    const { username, password } = req.body;
    // 模拟登录验证
    if (username == '13264729940' && password == '123456') {
      res.json(
        {
          "code": 200,
          "message": "ok",
          "data": {
              "id": 30024,
              "name": "管理员",
              "username": "13264729940",
              "tokenType": "wt",
              "posts": [
                  {
                      "id": 10,
                      "name": "ROLE_ADMIN",
                      "status": 1,
                      "storeId": 5516,
                      "store": "Happy English",
                      "storeUuid": "hfab21736",
                      "storeStatus": 1,
                      "isLimit": 0,
                      "limitCount": 0,
                      "expire": "2025-11-22 00:00"
                  }
              ],
              "openId": "oStMgs9kfyIEsc8JzZCag3qfB2bQ"
          }
        }
      );
    } else {
      res.status(401).json(
        {
          "code": 401,
          "message": "登陆账号或者密码错误",
          "data": null
        }
    );
    }
  },
};