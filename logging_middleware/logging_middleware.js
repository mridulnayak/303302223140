const axios = require('axios');
const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcmlkdWwxMjIwMDVAZ21haWwuY29tIiwiZXhwIjoxNzgwOTAxNDY3LCJpYXQiOjE3ODA5MDA1NjcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiZmJjYWE0ZS1kMDVmLTRiOTktOWU2ZS04ZTg2YmE0YzZkNzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtcmlkdWwgbmF5YWsiLCJzdWIiOiJlNTFiMGMwZi04ZDk0LTRiN2EtYWEwZS05NzFjZjUyMjk3YjQifSwiZW1haWwiOiJtcmlkdWwxMjIwMDVAZ21haWwuY29tIiwibmFtZSI6Im1yaWR1bCBuYXlhayIsInJvbGxObyI6IjMwMzMwMjIyMzE0MCIsImFjY2Vzc0NvZGUiOiJhR0JUSloiLCJjbGllbnRJRCI6ImU1MWIwYzBmLThkOTQtNGI3YS1hYTBlLTk3MWNmNTIyOTdiNCIsImNsaWVudFNlY3JldCI6InhLQ3VjVlZ6V21ySkNqUmoifQ.jgYtvRg9zGthWxdLAZwYZrluv7rRBmbk8xRcujF8hNQ';

async function Log(stack,level,pkg,message) {
  try {
    const response = await axios.post(
      'http://4.224.186.213/evaluation-service/logs',
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: ACCESS_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Log created successfully:', response.data);
  } catch (error) {
    console.error('Log failed:', error.response?.data || error.message);
  }
}

module.exports = Log;
