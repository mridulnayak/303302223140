# Stage 4
# Performanc improve

Solutions:  
1. Cache notifications (store recent data in memory like Redis).  
2. Use pagination (load few notifications at a time).  
3. Use real‑time push (send only new notifications).  
4. Background sync (update quietly every few minutes).

Trade‑offs:  
- Cache = fast but needs refresh.  
- Pagination = simple but shows less data.  
- Real‑time = best user experience but harder to build.  
- Background sync = smooth but slightly delayed.