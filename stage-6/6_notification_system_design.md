# Stage 6 – Priority Inbox
Goal:  
Show top 10 most important unread notifications first.  
Steps:  
1. Fetch notifications from API:  
   http://4.224.186.213/evaluation-service/notifications  
2. Sort them.  
3. Pick top 10 and show.

Example(JavaScript):
```js
const axios = require('axios');
const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcmlkdWwxMjIwMDVAZ21haWwuY29tIiwiZXhwIjoxNzgwOTA0MjcwLCJpYXQiOjE3ODA5MDMzNzAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI5ZDUwZTc0Yy1hNmNlLTRmMTEtOGQ4OS02NGVhNDE4ZGNmNTYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtcmlkdWwgbmF5YWsiLCJzdWIiOiJlNTFiMGMwZi04ZDk0LTRiN2EtYWEwZS05NzFjZjUyMjk3YjQifSwiZW1haWwiOiJtcmlkdWwxMjIwMDVAZ21haWwuY29tIiwibmFtZSI6Im1yaWR1bCBuYXlhayIsInJvbGxObyI6IjMwMzMwMjIyMzE0MCIsImFjY2Vzc0NvZGUiOiJhR0JUSloiLCJjbGllbnRJRCI6ImU1MWIwYzBmLThkOTQtNGI3YS1hYTBlLTk3MWNmNTIyOTdiNCIsImNsaWVudFNlY3JldCI6InhLQ3VjVlZ6V21ySkNqUmoifQ.PaRqf-HsKvrSEhb4XrKKhfGRBqQF_XgjU9Q0YtZZoik';

async function getTopNotifications() {
  const res = await axios.get('http://4.224.186.213/evaluation-service/notifications', {
    headers: { Authorization: ACCESS_TOKEN }
  });

  const data = res.data.notifications;
  const weight = { Placement: 3, Result: 2, Event: 1 };
  const sorted = data.sort((a, b) => {
    const scoreA = weight[a.Type];
    const scoreB = weight[b.Type];
    if (scoreA === scoreB) {
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    }
    return scoreB - scoreA;
  });
  const top10 = sorted.slice(0, 10);
  console.log('Top 10 Priority Notifications:', top10);
}

getTopNotifications();
