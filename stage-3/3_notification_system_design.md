# Stage 3

# reason of slow
No index = full table scan  
heavy load

# fix
CREATE INDEX idx_notifications_student_read
ON notifications (studentID, isRead);

# Why not index all
Slows insert
Uses more space  
Only index columns used

# Better query
SELECT notificationID, message, createdAt
FROM notifications


# Find placement notifications in last 7 days
SELECT studentID, message, createdAt
FROM notifications

