<!----- Senser Data Chart ----->
<template>
  <div class="space-y-6">
    <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        class="flex flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <p class="text-sm font-semibold text-emerald-600">
            ช่วงเวลาที่ต้องการดูข้อมูล
          </p>
          <h2 class="mt-1 text-l font-bold text-slate-900">
            เลือกช่วงวันที่เพื่อแสดงผลกราฟเซ็นเซอร์
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            ระบบจะอัปเดตแกนเวลาให้อัตโนมัติและรองรับการซูมเพื่อดูรายละเอียดในระดับชั่วโมง
          </p>
        </div>
        <div
          class="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"
        >
          <div class="w-full sm:w-64">
            <Datepicker
              v-model="state.dateRange"
              :format="state.dateFormat"
              @update:modelValue="onDateChange"
              placeholder="เลือกช่วงวันที่"
              range
              :highlighted="state.highlightedDates"
              :enable-time-picker="false"
              :max-date="new Date()"
            />
          </div>
          <button
            type="button"
            class="btn btn-info w-full text-white shadow-sm sm:w-auto"
            :disabled="userRole === 'Guest'"
            @click="exportData"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
            <span class="ml-2">Export ข้อมูล</span>
          </button>
        </div>
      </div>
    </section>

    <section v-if="anyChartDataAvailable">
      <div class="grid gap-6">
        <article
          v-for="card in activeChartCards"
          :key="card.key"
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <header
            class="flex flex-col gap-2 border-b border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 class="text-base font-semibold text-slate-900">
                {{ card.title }}
              </h3>
              <p class="text-xs text-slate-500">
                ข้อมูลจาก {{ formatDateLabel(state.dateRange?.[0]) }} ถึง
                {{ formatDateLabel(state.dateRange?.[1]) }}
              </p>
            </div>
            <span
              class="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-600"
            >
              <span
                class="inline-block h-2 w-2 rounded-full bg-emerald-500"
              ></span>
              {{ card.data.datasets[0].data.length }} จุดข้อมูล
            </span>
          </header>
          <div class="px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
            <LineChart :chart-data="card.data" :options="card.options" />
          </div>
        </article>
      </div>
    </section>

    <div
      v-else
      class="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center text-slate-500"
    >
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl"
      >
        📉
      </div>
      <p class="text-sm font-semibold text-slate-600">
        ยังไม่มีข้อมูลเซ็นเซอร์ในช่วงวันที่เลือก
      </p>
      <p class="mt-1 text-xs text-slate-400">
        ลองเลือกช่วงวันที่กว้างขึ้นหรือซิงก์ข้อมูลอุปกรณ์อีกครั้ง
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, ref } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as XLSX from "xlsx";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const NODE_BACKEND_URL = import.meta.env.VITE_NODE_BACKEND_URL;

Chart.register(...registerables, zoomPlugin);

export default {
  name: "SensorDataChart",
  components: {
    LineChart,
    Datepicker,
  },
  props: {
    dev_eui: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      dateRange: [new Date(), new Date()],
      dateFormat: "yyyy-MM-dd",
      temperatureChartData: null,
      humidityChartData: null,
      lightChartData: null,
      ecChartData: null,
      phChartData: null,
      meterChartData: null,
      avgDistanceChartData: null,
      levelChartData: null,
      waterLevelChartData: null,
      ppfdChartData: null,
      ppfdUnderChartData: null,
      ppfdAboveChartData: null,
      nitrogenChartData: null,
      phosphorusChartData: null,
      potassiumChartData: null,
      chartOptions: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              tooltipFormat: "yyyy-MM-dd",
              displayFormats: {
                hour: "HH:mm",
                day: "yyyy-MM-dd",
              },
            },
            title: {
              display: true,
              text: "วันที่",
            },
          },
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "x",
            },
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: "x",
            },
          },
        },
      },
      get highlightedDates() {
        if (this.dateRange && this.dateRange.length === 2) {
          const dates = [];
          const currentDate = new Date(this.dateRange[0]);
          while (currentDate <= this.dateRange[1]) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        }
        return [];
      },
      get temperatureChartOptions() {
        return buildChartOptions(this, "อุณหภูมิ (°C)");
      },
      get humidityChartOptions() {
        return buildChartOptions(this, "ความชื้น (%)");
      },
      get lightChartOptions() {
        return buildChartOptions(this, "ความเข้มแสง (lux)");
      },
      get ecChartOptions() {
        return buildChartOptions(this, "ค่าการนำไฟฟ้า (mS/cm)");
      },
      get phChartOptions() {
        return buildChartOptions(this, "pH");
      },
      get meterChartOptions() {
        return buildChartOptions(this, "มิเตอร์น้ำ (m³)");
      },
      get avgDistanceChartOptions() {
        return buildChartOptions(this, "ระดับน้ำ");
      },
      get ppfdChartOptions() {
        return buildChartOptions(this, "PPFD (µmol/m²/s)");
      },
      get ppfdUnderChartOptions() {
        return buildChartOptions(this, "PPFD Under (µmol/m²/s)");
      },
      get ppfdAboveChartOptions() {
        return buildChartOptions(this, "PPFD Above (µmol/m²/s)");
      },
      get nitrogenChartOptions() {
        return buildChartOptions(this, "ไนโตรเจน (ppm)");
      },
      get phosphorusChartOptions() {
        return buildChartOptions(this, "ฟอสฟอรัส (ppm)");
      },
      get potassiumChartOptions() {
        return buildChartOptions(this, "โพแทสเซียม (ppm)");
      },
    });

    const hasChartDataset = (chartData) =>
      Array.isArray(chartData?.datasets?.[0]?.data) &&
      chartData.datasets[0].data.length > 0;

    const chartCards = computed(() => {
      const buildCard = (key, data, options, fallbackTitle) => ({
        key,
        data,
        options,
        title: data?.datasets?.[0]?.label || fallbackTitle,
      });

      return [
        buildCard(
          "temperature",
          state.temperatureChartData,
          state.temperatureChartOptions,
          "อุณหภูมิ",
        ),
        buildCard(
          "humidity",
          state.humidityChartData,
          state.humidityChartOptions,
          "ความชื้น",
        ),
        buildCard(
          "light",
          state.lightChartData,
          state.lightChartOptions,
          "ความเข้มแสง",
        ),
        buildCard(
          "ec",
          state.ecChartData,
          state.ecChartOptions,
          "ค่าการนำไฟฟ้า",
        ),
        buildCard("ph", state.phChartData, state.phChartOptions, "pH"),
        buildCard(
          "meter",
          state.meterChartData,
          state.meterChartOptions,
          "มิเตอร์น้ำ",
        ),
        buildCard(
          "water",
          state.waterLevelChartData,
          state.avgDistanceChartOptions,
          "ระดับน้ำ",
        ),
        buildCard("ppfd", state.ppfdChartData, state.ppfdChartOptions, "PPFD"),
        buildCard(
          "ppfd_under",
          state.ppfdUnderChartData,
          state.ppfdUnderChartOptions,
          "PPFD Under",
        ),
        buildCard(
          "ppfd_above",
          state.ppfdAboveChartData,
          state.ppfdAboveChartOptions,
          "PPFD Above",
        ),
        buildCard(
          "nitrogen",
          state.nitrogenChartData,
          state.nitrogenChartOptions,
          "ไนโตรเจน (N)",
        ),
        buildCard(
          "phosphorus",
          state.phosphorusChartData,
          state.phosphorusChartOptions,
          "ฟอสฟอรัส (P)",
        ),
        buildCard(
          "potassium",
          state.potassiumChartData,
          state.potassiumChartOptions,
          "โพแทสเซียม (K)",
        ),
      ];
    });

    const activeChartCards = computed(() =>
      chartCards.value.filter((card) => hasChartDataset(card.data)),
    );

    const anyChartDataAvailable = computed(
      () => activeChartCards.value.length > 0,
    );

    const formatDateLabel = (date) => {
      if (!date) return "-";
      const value = date instanceof Date ? date : new Date(date);
      if (Number.isNaN(value.getTime())) return "-";
      return value.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const fetchSensorData = async (start, end) => {
      try {
        const formattedStartDate = start.toISOString().split("T")[0];
        const formattedEndDate = end.toISOString().split("T")[0];
        const response = await axios.get(
          `${NODE_BACKEND_URL}/api/influx/sensor-data`,
          {
            params: {
              dev_eui: props.dev_eui,
              start_date: formattedStartDate,
              end_date: formattedEndDate,
              measurements: [
                "device_frmpayload_data_temp",
                "device_frmpayload_data_humid",
                "device_frmpayload_data_light",
                "device_frmpayload_data_ec",
                "device_frmpayload_data_ph",
                "device_frmpayload_data_meter",
                "device_frmpayload_data_average_distance",
                "device_frmpayload_data_ppfd",
                "device_frmpayload_data_ppfd_above",
                "device_frmpayload_data_ppfd_under",
                "device_frmpayload_data_nitrogen",
                "device_frmpayload_data_phosphorus",
                "device_frmpayload_data_potassium",
              ].join(","),
            },
          },
        );

        const data = response.data ?? [];

        state.temperatureChartData = processChartData(
          data,
          "device_frmpayload_data_temp",
        );
        state.humidityChartData = processChartData(
          data,
          "device_frmpayload_data_humid",
        );
        state.lightChartData = processChartData(
          data,
          "device_frmpayload_data_light",
        );
        state.ecChartData = processChartData(data, "device_frmpayload_data_ec");
        state.phChartData = processChartData(data, "device_frmpayload_data_ph");
        state.meterChartData = processChartData(
          data,
          "device_frmpayload_data_meter",
        );
        state.avgDistanceChartData = processChartData(
          data,
          "device_frmpayload_data_average_distance",
        );
        state.levelChartData = processChartData(
          data,
          "device_frmpayload_data_level",
        );
        state.waterLevelChartData = hasChartDataset(state.avgDistanceChartData)
          ? state.avgDistanceChartData
          : hasChartDataset(state.levelChartData)
            ? state.levelChartData
            : state.avgDistanceChartData;
        state.ppfdChartData = processChartData(
          data,
          "device_frmpayload_data_ppfd",
        );
        state.ppfdAboveChartData = processChartData(
          data,
          "device_frmpayload_data_ppfd_above",
        );
        state.ppfdUnderChartData = processChartData(
          data,
          "device_frmpayload_data_ppfd_under",
        );
        state.nitrogenChartData = processChartData(
          data,
          "device_frmpayload_data_nitrogen",
        );
        state.phosphorusChartData = processChartData(
          data,
          "device_frmpayload_data_phosphorus",
        );
        state.potassiumChartData = processChartData(
          data,
          "device_frmpayload_data_potassium",
        );
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    const processChartData = (data, measurement) => {
      const dataDict = {
        device_frmpayload_data_temp: "อุณหภูมิ",
        device_frmpayload_data_humid: "ความชื้น",
        device_frmpayload_data_light: "ความเข้มแสง",
        device_frmpayload_data_ec: "ค่าการนำไฟฟ้า",
        device_frmpayload_data_ph: "pH",
        device_frmpayload_data_meter: "มิเตอร์น้ำ",
        device_frmpayload_data_average_distance: "ระดับน้ำ",
        device_frmpayload_data_level: "ระดับน้ำ",
        device_frmpayload_data_ppfd: "PPFD",
        device_frmpayload_data_ppfd_above: "PPFD Above",
        device_frmpayload_data_ppfd_under: "PPFD Under",
        device_frmpayload_data_nitrogen: "ไนโตรเจน (N)",
        device_frmpayload_data_phosphorus: "ฟอสฟอรัส (P)",
        device_frmpayload_data_potassium: "โพแทสเซียม (K)",
      };

      const chartData = {
        labels: [],
        datasets: [
          {
            label: dataDict[measurement] ?? measurement,
            data: [],
            borderColor: "rgba(16, 185, 129, 1)",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.3,
            fill: false,
          },
        ],
      };

      data.forEach((item) => {
        const rawValue = item[measurement];
        if (rawValue === undefined || rawValue === null) return;

        const numericValue =
          typeof rawValue === "number" ? rawValue : Number(rawValue);
        if (!Number.isFinite(numericValue)) return;

        chartData.labels.push(new Date(item._time));
        chartData.datasets[0].data.push(numericValue);
      });

      return chartData;
    };

    const onDateChange = (newDateRange) => {
      if (
        !Array.isArray(newDateRange) ||
        newDateRange.length < 2 ||
        !newDateRange[0] ||
        !newDateRange[1]
      ) {
        return;
      }
      state.dateRange = newDateRange;
      fetchSensorData(newDateRange[0], newDateRange[1]);
    };

    const filterDevices = async () => {
      try {
        const response = await axios.get(`${NODE_BACKEND_URL}/api/devices`);
        const devEUI = props.dev_eui;
        const device = response.data.find((item) => item.deviceEUI === devEUI);
        if (!device) {
          console.warn(`ไม่พบอุปกรณ์ที่มี DevEUI: ${devEUI}`);
          return devEUI;
        }
        return device.deviceName;
      } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลได้", error);
        return props.dev_eui;
      }
    };

    const userRole = ref("Guest");
    onMounted(() => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          userRole.value = decodedToken.role || "User";
        } catch (error) {
          console.error("Error decoding token:", error);
          userRole.value = "User";
        }
      }

      fetchSensorData(state.dateRange[0], state.dateRange[1]);
    });

    const formatThailandDateTime = (date) => {
      if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        return "";
      }

      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const parts = formatter.formatToParts(date);
      const getPart = (type) =>
        parts.find((part) => part.type === type)?.value ?? "00";

      return `${getPart("year")}-${getPart("month")}-${getPart(
        "day",
      )} ${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;
    };

    const exportData = async () => {
      const allData = {
        temperature: state.temperatureChartData?.datasets[0]?.data || [],
        humidity: state.humidityChartData?.datasets[0]?.data || [],
        light: state.lightChartData?.datasets[0]?.data || [],
        ec: state.ecChartData?.datasets[0]?.data || [],
        ph: state.phChartData?.datasets[0]?.data || [],
        meter: state.meterChartData?.datasets[0]?.data || [],
        water: state.waterLevelChartData?.datasets[0]?.data || [],
        ppfd: state.ppfdChartData?.datasets[0]?.data || [],
        ppfd_above: state.ppfdAboveChartData?.datasets[0]?.data || [],
        ppfd_under: state.ppfdUnderChartData?.datasets[0]?.data || [],
        nitrogen: state.nitrogenChartData?.datasets[0]?.data || [],
        phosphorus: state.phosphorusChartData?.datasets[0]?.data || [],
        potassium: state.potassiumChartData?.datasets[0]?.data || [],
      };

      const possibleLabels = [
        state.temperatureChartData?.labels,
        state.humidityChartData?.labels,
        state.lightChartData?.labels,
        state.ecChartData?.labels,
        state.phChartData?.labels,
        state.meterChartData?.labels,
        state.avgDistanceChartData?.labels,
        state.levelChartData?.labels,
        state.waterLevelChartData?.labels,
        state.ppfdChartData?.labels,
        state.ppfdAboveChartData?.labels,
        state.ppfdUnderChartData?.labels,
        state.nitrogenChartData?.labels,
        state.phosphorusChartData?.labels,
        state.potassiumChartData?.labels,
      ].filter((labels) => Array.isArray(labels) && labels.length > 0);

      if (possibleLabels.length > 0) {
        allData.time = possibleLabels[0];
      } else {
        allData.time = [];
      }

      if (!allData.time.length) {
        console.warn("ไม่มีข้อมูลสำหรับการส่งออก");
        return;
      }

      const workbook = XLSX.utils.book_new();

      Object.entries(allData).forEach(([key, value]) => {
        if (key === "time" || !Array.isArray(value) || value.length === 0) {
          return;
        }

        const formattedData = allData.time.map((time, index) => {
          const formattedTime = new Date(time);
          const formattedDate = formatThailandDateTime(formattedTime);

          return {
            Date: formattedDate,
            [key]: value[index] ?? null,
          };
        });

        formattedData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, key);
      });

      const formattedStartDate = formatDateForFile(state.dateRange[0]);
      const formattedEndDate = formatDateForFile(state.dateRange[1]);
      const deviceName = await filterDevices();

      const filename =
        formattedStartDate === formattedEndDate
          ? `ข้อมูลเซ็นเซอร์ ${deviceName} วันที่ ${formattedStartDate}.xlsx`
          : `ข้อมูลเซ็นเซอร์ ${deviceName} ระหว่างวันที่ ${formattedStartDate} ถึง ${formattedEndDate}.xlsx`;

      XLSX.writeFile(workbook, filename);
    };

    return {
      state,
      activeChartCards,
      anyChartDataAvailable,
      onDateChange,
      exportData,
      userRole,
      formatDateLabel,
    };
  },
};

const buildChartOptions = (context, yLabel) => {
  const timeDifference = context.dateRange[1] - context.dateRange[0];
  const oneDay = 24 * 60 * 60 * 1000;

  return {
    ...context.chartOptions,
    scales: {
      ...context.chartOptions.scales,
      x: {
        ...context.chartOptions.scales.x,
        time: {
          ...context.chartOptions.scales.x.time,
          unit: timeDifference <= oneDay ? "hour" : "day",
          tooltipFormat:
            timeDifference <= oneDay
              ? "yyyy-MM-dd HH:mm:ss"
              : "yyyy-MM-dd HH:mm:ss",
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
      },
    },
  };
};

const formatDateForFile = (date) => {
  if (!date) return "unknown";
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) return "unknown";
  return value.toISOString().split("T")[0].split("-").reverse().join("-");
};
</script>
