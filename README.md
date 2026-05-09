# goodwe-sems-client

A TypeScript/JavaScript client library for the GoodWe SEMS (Solar Energy Management System) API. Retrieve real-time solar generation data, inverter statistics, weather forecasts, and more from your GoodWe solar installation.

[![npm version](https://badge.fury.io/js/goodwe-sems-client.svg)](https://www.npmjs.com/package/goodwe-sems-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Full TypeScript support with comprehensive type definitions
- Automatic authentication and token management
- Token refresh on expiry
- Access to real-time and historical solar data
- Inverter-level monitoring data
- Weather forecast integration
- Energy statistics and environmental impact data

## Installation

```bash
npm install goodwe-sems-client
```

Or with yarn:

```bash
yarn add goodwe-sems-client
```

## Prerequisites

You need:
1. A GoodWe SEMS portal account (https://www.semsportal.com)
2. Your power station ID (found in the SEMS portal URL or app)

## Quick Start

```typescript
import { SemsClient } from 'goodwe-sems-client';

const client = new SemsClient({
  username: 'your-email@example.com',
  password: 'your-password',
  powerStationId: 'your-power-station-id',
});

const data = await client.getMonitorDetail();
console.log(`Current power: ${data.kpi.pac} W`);
console.log(`Today's generation: ${data.kpi.power} kWh`);
```

## API Reference

### Constructor

```typescript
new SemsClient(config: SemsClientConfig)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | `string` | Yes | Your SEMS portal email |
| `password` | `string` | Yes | Your SEMS portal password |
| `powerStationId` | `string` | Yes | Your power station ID |
| `timeout` | `number` | No | Request timeout in ms (default: 30000) |

### Methods

#### `getMonitorDetail(): Promise<PowerStationDetail>`

Returns comprehensive monitoring data for your power station.

#### `clearToken(): void`

Clears the cached authentication token, forcing re-authentication on the next request.

## Response Data

The `getMonitorDetail()` method returns a `PowerStationDetail` object with the following structure:

### Station Info (`info`)

```typescript
data.info.stationname      // Station name
data.info.capacity         // System capacity in kW
data.info.address          // Installation address
data.info.time             // Last data update time
data.info.powerstation_id  // Unique station identifier
data.info.latitude         // GPS latitude
data.info.longitude        // GPS longitude
data.info.powerstation_type // e.g., "Residential"
data.info.status           // Station status (1 = normal)
data.info.create_time      // Installation date
data.info.turnon_time      // First power-on date
```

### Key Performance Indicators (`kpi`)

```typescript
data.kpi.pac               // Current power output in Watts
data.kpi.power             // Today's generation in kWh
data.kpi.total_power       // Lifetime generation in kWh
data.kpi.month_generation  // This month's generation in kWh
data.kpi.day_income        // Today's income
data.kpi.total_income      // Lifetime income
data.kpi.yield_rate        // Feed-in tariff rate
data.kpi.currency          // Currency code (e.g., "AUD", "USD")
```

### Inverter Data (`inverter[]`)

Each inverter in the array contains:

```typescript
inverter.sn                // Serial number
inverter.type              // Model (e.g., "GW5000-DNS-30")
inverter.name              // User-defined name
inverter.capacity          // Inverter capacity in kW
inverter.status            // Status (1 = normal)
inverter.out_pac           // Current AC output in Watts
inverter.eday              // Today's generation in kWh
inverter.emonth            // This month's generation in kWh
inverter.etotal            // Lifetime generation in kWh
inverter.tempperature      // Internal temperature in °C
inverter.firmware_version  // Firmware version

// Detailed electrical data (inverter.d)
inverter.d.vpv1            // PV string 1 voltage (V)
inverter.d.vpv2            // PV string 2 voltage (V)
inverter.d.ipv1            // PV string 1 current (A)
inverter.d.ipv2            // PV string 2 current (A)
inverter.d.vac1            // AC voltage (V)
inverter.d.iac1            // AC current (A)
inverter.d.fac1            // AC frequency (Hz)
inverter.d.pac             // AC power (W)
inverter.d.hTotal          // Total operating hours
```

### Weather Forecast (`weather`)

7-day weather forecast for your location:

```typescript
const forecast = data.weather.HeWeather6[0]?.daily_forecast;

forecast[0].date           // Date (YYYY-MM-DD)
forecast[0].cond_txt_d     // Day condition (e.g., "Sunny")
forecast[0].cond_txt_n     // Night condition (e.g., "Clear")
forecast[0].tmp_max        // Max temperature
forecast[0].tmp_min        // Min temperature
forecast[0].hum            // Humidity %
forecast[0].wind_dir       // Wind direction
forecast[0].wind_spd       // Wind speed
forecast[0].uv_index       // UV index
forecast[0].pop            // Probability of precipitation %
```

### Environmental Benefits (`hjgx`)

```typescript
data.hjgx.co2              // CO2 emissions reduced (tons)
data.hjgx.tree             // Equivalent trees planted
data.hjgx.coal             // Coal saved (tons)
```

### Energy Statistics

Daily statistics (`energeStatisticsCharts`) and lifetime totals (`energeStatisticsTotals`):

```typescript
data.energeStatisticsCharts.sum            // Total generation
data.energeStatisticsCharts.selfUseOfPv    // Self-consumed energy
data.energeStatisticsCharts.sell           // Energy exported to grid
data.energeStatisticsCharts.buy            // Energy imported from grid
data.energeStatisticsCharts.charge         // Battery charging
data.energeStatisticsCharts.disCharge      // Battery discharging
data.energeStatisticsCharts.selfUseRate    // Self-consumption rate (0-1)
data.energeStatisticsCharts.contributingRate // Solar contribution rate (0-1)
```

### Equipment List (`equipment[]`)

```typescript
data.equipment[0].title              // Device name
data.equipment[0].sn                 // Serial number
data.equipment[0].status             // Status code
data.equipment[0].powerGeneration    // Current power string
data.equipment[0].eday               // Today's generation string
data.equipment[0].subordinateEquipment // Connected data logger
```

## Complete Example

```typescript
import { SemsClient, PowerStationDetail } from 'goodwe-sems-client';

async function monitorSolarSystem() {
  const client = new SemsClient({
    username: process.env.GOODWE_USERNAME!,
    password: process.env.GOODWE_PASSWORD!,
    powerStationId: process.env.GOODWE_POWER_STATION_ID!,
  });

  try {
    const data: PowerStationDetail = await client.getMonitorDetail();

    // Station overview
    console.log(`\n${data.info.stationname} (${data.info.capacity} kW)`);
    console.log(`Location: ${data.info.address}`);
    console.log(`Last updated: ${data.info.time}`);

    // Current generation
    console.log(`\nCurrent output: ${data.kpi.pac} W`);
    console.log(`Today: ${data.kpi.power} kWh`);
    console.log(`This month: ${data.kpi.month_generation} kWh`);
    console.log(`Lifetime: ${data.kpi.total_power} kWh`);

    // Financial
    console.log(`\nToday's earnings: ${data.kpi.day_income} ${data.kpi.currency}`);
    console.log(`Total earnings: ${data.kpi.total_income} ${data.kpi.currency}`);

    // Per-inverter details
    for (const inv of data.inverter) {
      console.log(`\nInverter: ${inv.name} (${inv.type})`);
      console.log(`  Serial: ${inv.sn}`);
      console.log(`  Output: ${inv.out_pac} W`);
      console.log(`  Temperature: ${inv.tempperature}°C`);
      console.log(`  PV1: ${inv.d.vpv1}V @ ${inv.d.ipv1}A`);
      console.log(`  PV2: ${inv.d.vpv2}V @ ${inv.d.ipv2}A`);
      console.log(`  Grid: ${inv.d.vac1}V @ ${inv.d.iac1}A, ${inv.d.fac1}Hz`);
    }

    // Environmental impact
    console.log(`\nEnvironmental Impact:`);
    console.log(`  CO2 reduced: ${data.hjgx.co2.toFixed(2)} tons`);
    console.log(`  Trees equivalent: ${data.hjgx.tree.toFixed(0)}`);

    // Weather
    const today = data.weather.HeWeather6[0]?.daily_forecast?.[0];
    if (today) {
      console.log(`\nToday's weather: ${today.cond_txt_d}, ${today.tmp_min}-${today.tmp_max}°C`);
    }

  } catch (error) {
    console.error('Error fetching solar data:', error);
  }
}

monitorSolarSystem();
```

## Finding Your Power Station ID

1. Log in to the SEMS Portal (https://www.semsportal.com)
2. Navigate to your power station
3. The ID is in the URL: `https://www.semsportal.com/powerstation/powerstatussnmin/{POWER_STATION_ID}`

Alternatively, check the mobile app settings or contact GoodWe support.

## Environment Variables

For security, use environment variables instead of hardcoding credentials:

```bash
export GOODWE_USERNAME="your-email@example.com"
export GOODWE_PASSWORD="your-password"
export GOODWE_POWER_STATION_ID="your-station-id"
```

```typescript
const client = new SemsClient({
  username: process.env.GOODWE_USERNAME!,
  password: process.env.GOODWE_PASSWORD!,
  powerStationId: process.env.GOODWE_POWER_STATION_ID!,
});
```

## Error Handling

```typescript
import { SemsClient } from 'goodwe-sems-client';

const client = new SemsClient({ /* config */ });

try {
  const data = await client.getMonitorDetail();
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('Login failed')) {
      console.error('Invalid credentials');
    } else if (error.message.includes('API error')) {
      console.error('API returned an error:', error.message);
    } else {
      console.error('Network or other error:', error.message);
    }
  }
}
```

## TypeScript Support

All types are exported for use in your TypeScript projects:

```typescript
import {
  SemsClient,
  SemsClientConfig,
  PowerStationDetail,
  PowerStationInfo,
  KPI,
  Inverter,
  InverterData,
  Weather,
  DailyForecast,
  EnergyStatistics,
  EnvironmentalBenefits,
  Equipment,
} from 'goodwe-sems-client';
```

## Limitations

- This library uses the SEMS Portal API which is not officially documented
- API access depends on GoodWe maintaining the current endpoint structure
- Rate limiting may apply; avoid excessive polling
- Only the v3 monitoring endpoint is currently supported

## Related Projects

- [goodwe-sems-home-assistant](https://github.com/TimSoethout/goodwe-sems-home-assistant) - Home Assistant integration
- [GoodWe](https://www.goodwe.com) - Official GoodWe website

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This is an unofficial library and is not affiliated with, endorsed by, or connected to GoodWe or SEMS Portal. Use at your own risk.
