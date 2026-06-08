# Stage 1
# Actions
- Add new notification  
- Get user notifications  
- Mark as read/unread  
- Delete notification  
- Real‑time updates (WebSocket)

# Endpoint
action: 
creation
get all
mark it read
delete
updatng live

method:
post
get
patch
delete
ws

endings:
notifications
studentID notification
reading notifcation(ID)
notifcation ID
ws Notifiction

# Example
Request:
{
  "studentID": 1042,
  "message": "Placement result announced!",
  "notificationType": "Placement"
}

Response:
{
  "notificationID": 1,
  "status": "created",
  "timestamp": "2026‑06‑08T12:30:00Z"
}
