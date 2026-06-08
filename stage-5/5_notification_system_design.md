# Stage 5
# reliability

Issues:  
- Loop is slow.  
- No retry for failed emails.  
- DB save and email happen together, so one failure stops others.

GUD way:  
- Save all notifications to DB first.  
- Use a queue or worker system to send emails and app pushes in parallel.  
- Add retry for failed emails.
