const axios = require('axios');
const Log = require('../logging_middleware/logging_middleware');
const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtcmlkdWwxMjIwMDVAZ21haWwuY29tIiwiZXhwIjoxNzgwOTAxNDY3LCJpYXQiOjE3ODA5MDA1NjcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiZmJjYWE0ZS1kMDVmLTRiOTktOWU2ZS04ZTg2YmE0YzZkNzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtcmlkdWwgbmF5YWsiLCJzdWIiOiJlNTFiMGMwZi04ZDk0LTRiN2EtYWEwZS05NzFjZjUyMjk3YjQifSwiZW1haWwiOiJtcmlkdWwxMjIwMDVAZ21haWwuY29tIiwibmFtZSI6Im1yaWR1bCBuYXlhayIsInJvbGxObyI6IjMwMzMwMjIyMzE0MCIsImFjY2Vzc0NvZGUiOiJhR0JUSloiLCJjbGllbnRJRCI6ImU1MWIwYzBmLThkOTQtNGI3YS1hYTBlLTk3MWNmNTIyOTdiNCIsImNsaWVudFNlY3JldCI6InhLQ3VjVlZ6V21ySkNqUmoifQ.jgYtvRg9zGthWxdLAZwYZrluv7rRBmbk8xRcujF8hNQ';

async function scheduleVehicles() {
  try {
    // Fetch depots
    const depotsResponse = await axios.get('http://4.224.186.213/evaluation-service/depots', {
      headers: { Authorization: ACCESS_TOKEN }
    });
    const depots = depotsResponse.data.depots || [];

    // Fetch vehicles
    const vehiclesResponse = await axios.get('http://4.224.186.213/evaluation-service/vehicles', {
      headers: { Authorization: ACCESS_TOKEN }
    });
    const vehicles = vehiclesResponse.data.vehicles || [];

    Log('backend', 'info', 'controller', 'Fetched depot and vehicle data successfully');

    // Sort vehicles by Impact/Duration ratio (greedy approach)
    const sortedVehicles = vehicles.sort((a, b) => (b.Impact / b.Duration) - (a.Impact / a.Duration));

    // Assign vehicles to depots
    for (const depot of depots) {
      let remainingHours = depot.MechanicHours;
      const chosenTasks = [];

      for (const vehicle of sortedVehicles) {
        if (vehicle.Duration <= remainingHours) {
          chosenTasks.push(vehicle);
          remainingHours -= vehicle.Duration;
        }
      }

      const totalImpact = chosenTasks.reduce((sum, v) => sum + v.Impact, 0);

      console.log(`Depot ${depot.ID}:`, chosenTasks);
      console.log(`Total Impact: ${totalImpact}`);

      Log('backend', 'info', 'service', `Depot ${depot.ID} scheduled successfully`);
    }

    Log('backend', 'info', 'service', 'Scheduling completed successfully');
  } catch (error) {
    Log('backend', 'error', 'controller', error.message);
    console.error('❌ Error:', error.message);
  }
}

scheduleVehicles();
