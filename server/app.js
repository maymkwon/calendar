const redis = require('redis');
const express = require('express');
const cors = require('cors');
const app = express();
const client = redis.createClient(6379);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const promisegetLen = () => {
  return new Promise((resolve, reject) => {
    return client.llen('dates', (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
};

const promisegetAllList = () => {
  return new Promise((resolve, reject) => {
    return client.lrange('dates', 0, -1, (err, reply) => {
      let eventData = [];
      if (err) {
        reject(err);
      } else {
        if (reply.length !== 0) {
          reply.map((o, i) => {
            let parseData = JSON.parse(o);
            eventData.push(parseData);
          });
        }
      }
      resolve(eventData);
    });
  });
};

app.get('/events', (req, res, next) => {
  let eventData = [];
  return client.lrange('dates', 0, -1, (err, reply) => {
    if (err) return { msg: '알 수 없는 에러' };
    if (reply.length !== 0) {
      reply.map((o, i) => {
        let parseData = JSON.parse(o);
        eventData.push(parseData);
      });
    }
    res.json(eventData);
    next();
  });
});

app.post('/create', (req, res, next) => {
  let body = req.body;
  let getLen = promisegetLen();
  getLen.then(len => {
    body.id = len;
    const jsonData = JSON.stringify(body);
    return client.lpush('dates', jsonData, (err, reply) => {
      res.json({ message: '등록 완료' });
      next();
    });
  });
});

app.post('/delete', (req, res, next) => {
  let targetId = req.body.id;
  let getAllList = promisegetAllList();
  getAllList.then(arr => {
    let findIdx = arr.findIndex(o => o.id === targetId);
    client.lindex('dates', findIdx, (err, reply) => {
      client.lrem('dates', 1, reply);
      res.json(reply);
      next();
    });
  });
});
app.post('/update', (req, res, next) => {
  let body = req.body;
  let targetId = body.id;
  let getAllList = promisegetAllList();
  const jsonData = JSON.stringify(body);
  getAllList.then(arr => {
    let findIdx = arr.findIndex(o => o.id === targetId);
    client.lindex('dates', findIdx, (err, reply) => {
      client.lrem('dates', 1, reply);

      client.lpush('dates', jsonData);

      res.json(reply);
      next();
    });
  });
});

app.listen(3001, () => {
  console.log('HELLO node 연결! (:3001)');
});
client.on('error', err => {
  console.log('redis 연결 실패 서버를 실행 해 주세요');
});
client.on('connect', () => {
  console.log('redis 연결 성공');
});
