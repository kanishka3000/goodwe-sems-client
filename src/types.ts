export interface SemsClientConfig {
  username: string;
  password: string;
  powerStationId: string;
  timeout?: number;
}

export interface TokenData {
  token: string;
  timestamp: number;
  uid: string;
  api: string;
  client: string;
  version: string;
  language: string;
}

export interface PowerStationInfo {
  powerstation_id: string;
  time: string;
  date_format: string;
  date_format_ym: string;
  stationname: string;
  address: string;
  owner_name: string;
  owner_phone: string | null;
  owner_email: string;
  battery_capacity: number;
  turnon_time: string;
  create_time: string;
  capacity: number;
  longitude: number;
  latitude: number;
  powerstation_type: string;
  status: number;
  is_stored: boolean;
  is_powerflow: boolean;
  charts_type: number;
  has_pv: boolean;
  has_statistics_charts: boolean;
  only_bps: boolean;
  only_bpu: boolean;
  time_span: number;
  pr_value: string;
  org_code: string;
  org_name: string;
}

export interface KPI {
  month_generation: number;
  pac: number;
  power: number;
  total_power: number;
  day_income: number;
  total_income: number;
  yield_rate: number;
  currency: string;
}

export interface DailyForecast {
  cond_code_d: string;
  cond_code_n: string;
  cond_txt_d: string;
  cond_txt_n: string;
  date: string;
  hum: string;
  pcpn: string;
  pop: string;
  pres: string;
  tmp_max: string;
  tmp_min: string;
  uv_index: string;
  vis: string;
  wind_deg: string;
  wind_dir: string;
  wind_sc: string;
  wind_spd: string;
}

export interface Weather {
  HeWeather6: Array<{
    basic: {
      cid: string | null;
      location: string | null;
      parent_city: string | null;
      admin_area: string | null;
      cnty: string | null;
      lat: string | null;
      lon: string | null;
      tz: string | null;
    };
    update: {
      loc: string | null;
      utc: string | null;
    };
    status: string;
    daily_forecast: DailyForecast[];
  }>;
}

export interface InverterDictItem {
  isHT: boolean;
  isStoreSkip: boolean;
  key: string;
  value: string;
  unit: string;
  isFaultMsg: number;
  faultMsgCode: number;
}

export interface InverterData {
  pw_id: string;
  capacity: string;
  model: string;
  output_power: string;
  output_current: string;
  grid_voltage: string;
  backup_output: string;
  soc: string;
  soh: string;
  last_refresh_time: string;
  work_mode: string;
  dc_input1: string;
  dc_input2: string;
  battery: string;
  bms_status: string;
  warning: string;
  charge_current_limit: string;
  discharge_current_limit: string;
  firmware_version: number;
  creationDate: string;
  eDay: number;
  eTotal: number;
  pac: number;
  hTotal: number;
  vpv1: number;
  vpv2: number;
  vpv3: number;
  vpv4: number | null;
  ipv1: number;
  ipv2: number;
  ipv3: number;
  ipv4: number | null;
  vac1: number;
  vac2: number | null;
  vac3: number | null;
  iac1: number;
  iac2: number | null;
  iac3: number | null;
  fac1: number;
  fac2: number | null;
  fac3: number | null;
  istr1: number;
  istr2: number;
  istr3: number;
  istr4: number | null;
  istr5: number | null;
  istr6: number | null;
  istr7: number | null;
  istr8: number | null;
  istr9: number | null;
  istr10: number | null;
  istr11: number | null;
  istr12: number | null;
  istr13: number | null;
  istr14: number | null;
  istr15: number | null;
  istr16: number | null;
}

export interface InverterFull {
  relation_id: string;
  ct_solution_type: number;
  cts: unknown;
  sn: string;
  check_code: string;
  powerstation_id: string;
  name: string;
  model_type: string;
  change_type: number;
  change_time: number;
  capacity: number;
  battery1_capacity: number | null;
  battery2_capacity: number | null;
  eday: number;
  hour_stat_eday: number;
  iday: number;
  etotal: number;
  itotal: number;
  hour_total: number;
  status: number;
  turnon_time: number;
  pac: number;
  tempperature: number;
  vpv1: number;
  vpv2: number;
  vpv3: number;
  vpv4: number | null;
  ipv1: number;
  ipv2: number;
  ipv3: number;
  ipv4: number | null;
  vac1: number;
  vac2: number | null;
  vac3: number | null;
  iac1: number;
  iac2: number | null;
  iac3: number | null;
  fac1: number;
  fac2: number | null;
  fac3: number | null;
  last_time: number;
  vbattery1: number;
  ibattery1: number;
  pmeter: number;
  soc: number;
  soh: number;
  bms_discharge_i_max: number | null;
  bms_charge_i_max: number;
  bms_warning: number;
  bms_alarm: number | null;
  battary_work_mode: number;
  workmode: number;
  vload: number | null;
  iload: number;
  firmwareversion: number;
  bmssoftwareversion: number | null;
  pbackup: number;
  seller: number;
  buy: number;
  yesterdaybuytotal: number;
  yesterdaysellertotal: number;
  thismonthetotle: number;
  lastmonthetotle: number;
  ram: number;
  outputpower: number;
  fault_messge: number;
  pf: number;
  pv_power: number;
  reactive_power: number;
  leakage_current: number;
  isoLimit: number;
  isbuettey: boolean;
  isbuetteybps: boolean;
  isbuetteybpu: boolean;
  dataloggersn: string;
  hasmeter: boolean;
  total_sell: number;
  total_buy: number;
  errors: unknown[];
  safetyConutry: number;
  inverter_type: number;
  total_pbattery: number;
  all_eday: number;
  output_etotal: number;
  output_yeasterdayTotal: number;
  output_eday: number;
}

export interface Inverter {
  sn: string;
  dict: {
    left: InverterDictItem[];
    right: InverterDictItem[];
  };
  is_stored: boolean;
  name: string;
  in_pac: number;
  out_pac: number;
  eday: number;
  emonth: number;
  etotal: number;
  status: number;
  turnon_time: string;
  releation_id: string;
  type: string;
  capacity: number;
  d: InverterData;
  it_change_flag: boolean;
  tempperature: number;
  check_code: string;
  invert_full: InverterFull;
  time: string;
  battery: string;
  firmware_version: number;
  warning_bms: string;
  soh: string;
  discharge_current_limit_bms: string;
  charge_current_limit_bms: string;
  soc: string;
  pv_input_2: string;
  pv_input_1: string;
  back_up_output: string;
  output_voltage: string;
  backup_voltage: string;
  output_current: string;
  output_power: string;
  total_generation: string;
  daily_generation: string;
  battery_charging: string;
  last_refresh_time: string;
  bms_status: string;
  pw_id: string;
  fault_message: string;
  warning_code: string | null;
  battery_power: number;
  has_tigo: boolean;
  canStartIV: boolean;
  battery_count: number | null;
  master: number | null;
}

export interface EnvironmentalBenefits {
  co2: number;
  tree: number;
  coal: number;
}

export interface EnergyStatistics {
  contributingRate: number;
  selfUseRate: number;
  sum: number;
  buy: number;
  buyPercent: number;
  sell: number;
  sellPercent: number;
  selfUseOfPv: number;
  consumptionOfLoad: number;
  chartsType: number;
  hasPv: boolean;
  hasCharge: boolean;
  charge: number;
  disCharge: number;
  gensetGen: number;
  hasGenset: boolean;
  isStored: boolean;
  hasMicroGrid: boolean;
  microGridGen: number;
}

export interface Equipment {
  type: string;
  title: string;
  status: number;
  model: string | null;
  statusText: string | null;
  capacity: string | null;
  actionThreshold: string | null;
  subordinateEquipment: string;
  powerGeneration: string;
  eday: string;
  brand: string;
  isStored: boolean;
  soc: string;
  isChange: boolean;
  relationId: string;
  sn: string;
  has_tigo: boolean;
  is_sec: boolean;
  is_secs: boolean;
  mark: boolean;
  master: number;
  changerVer: number;
}

export interface SOCStatus {
  power: number;
  status: number;
}

export interface PowerStationDetail {
  info: PowerStationInfo;
  kpi: KPI;
  powercontrol_status: number;
  images: unknown[];
  weather: Weather;
  inverter: Inverter[];
  hjgx: EnvironmentalBenefits;
  homKit: {
    homeKitLimit: boolean;
    sn: string | null;
  };
  isTigo: boolean;
  tigoIntervalTimeMinute: number;
  smuggleInfo: {
    isAllSmuggle: boolean;
    isSmuggle: boolean;
    descriptionText: string | null;
    sns: string | null;
  };
  hasPowerflow: boolean;
  hasGenset: boolean;
  hasMicroGrid: boolean;
  powerflow: unknown;
  hasGridLoad: boolean;
  isShowBattery: boolean;
  hasMicroInverter: boolean;
  hasLayout: boolean;
  layout_id: string;
  isParallelInventers: boolean;
  isEvCharge: boolean;
  evCharge: unknown;
  is3rdEms: boolean;
  hasEnergeStatisticsCharts: boolean;
  energeStatisticsCharts: EnergyStatistics;
  energeStatisticsTotals: EnergyStatistics;
  soc: SOCStatus;
  environmental: unknown[];
  equipment: Equipment[];
  isSec1000EtPlant: boolean;
}

export interface ApiResponse<T> {
  language: string;
  function: string[] | null;
  hasError: boolean;
  msg: string;
  code: number | string;
  data: T;
  api?: string;
  components: {
    para: string | null;
    langVer: number;
    timeSpan: number;
    msgSocketAdr: string | null;
  };
}
