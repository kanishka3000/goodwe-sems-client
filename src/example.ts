import { SemsClient } from './client';

const client = new SemsClient({
  username: process.env.GOODWE_USERNAME || '',
  password: process.env.GOODWE_PASSWORD || '',
  powerStationId: process.env.GOODWE_POWER_STATION_ID || '',
});

async function main() {
  if (!process.env.GOODWE_USERNAME || !process.env.GOODWE_PASSWORD || !process.env.GOODWE_POWER_STATION_ID) {
    console.error('Please set environment variables: GOODWE_USERNAME, GOODWE_PASSWORD, GOODWE_POWER_STATION_ID');
    process.exit(1);
  }

  console.log('Fetching power station data...\n');

  const detail = await client.getMonitorDetail();

  console.log('=== Station Info ===');
  console.log(`Name: ${detail.info.stationname}`);
  console.log(`Capacity: ${detail.info.capacity} kW`);
  console.log(`Address: ${detail.info.address}`);
  console.log(`Last Update: ${detail.info.time}`);

  console.log('\n=== Current Generation ===');
  console.log(`Current Power: ${detail.kpi.pac} W`);
  console.log(`Today: ${detail.kpi.power} kWh`);
  console.log(`This Month: ${detail.kpi.month_generation} kWh`);
  console.log(`Total: ${detail.kpi.total_power} kWh`);

  console.log('\n=== Income ===');
  console.log(`Today: ${detail.kpi.day_income} ${detail.kpi.currency}`);
  console.log(`Total: ${detail.kpi.total_income} ${detail.kpi.currency}`);

  console.log('\n=== Inverter ===');
  for (const inv of detail.inverter) {
    console.log(`Model: ${inv.type}`);
    console.log(`Serial: ${inv.sn}`);
    console.log(`Output: ${inv.out_pac} W`);
    console.log(`Temperature: ${inv.tempperature}°C`);
    console.log(`PV1: ${inv.d.vpv1}V / ${inv.d.ipv1}A`);
    console.log(`PV2: ${inv.d.vpv2}V / ${inv.d.ipv2}A`);
    console.log(`Grid: ${inv.d.vac1}V / ${inv.d.iac1}A @ ${inv.d.fac1}Hz`);
  }

  console.log('\n=== Environmental Impact ===');
  console.log(`CO2 Reduced: ${detail.hjgx.co2} tons`);
  console.log(`Equivalent Trees: ${detail.hjgx.tree}`);
  console.log(`Coal Saved: ${detail.hjgx.coal} tons`);

  console.log('\n=== Weather Forecast ===');
  const forecast = detail.weather.HeWeather6[0]?.daily_forecast?.slice(0, 3);
  if (forecast) {
    for (const day of forecast) {
      console.log(`${day.date}: ${day.cond_txt_d}, ${day.tmp_min}-${day.tmp_max}°C`);
    }
  }
}

main().catch(console.error);
