# Stage 2

# DB Choice
Use MySQL or PostgreSQL → good for structured data, indexing, joins.

# Table
CREATE TABLE notifications (
  notificationID SERIAL PRIMARY KEY,
  studentID INT NOT NULL,
  message TEXT NOT NULL,
  notificationType ENUM('Event','Result','Placement'),
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Queries
new notification  
INSERT INTO notifications (studentID, message, notificationType)
VALUES (1042, 'Placement result announced!', 'Placement');

Get unread notfications  
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = FALSE
ORDER BY createdAt DESC;

# Problems when data grows
Slow queries = use indexes  
Big data = use pagination, caching, partitioning
