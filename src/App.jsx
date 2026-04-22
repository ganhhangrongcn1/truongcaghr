import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  AlarmClock,
  Bell,
  BellOff,
  Clock3,
  ListOrdered,
  Phone,
  RefreshCcw,
  Search,
  StickyNote,
  Store,
} from "lucide-react";
import tingSound from "./assets/ting.mp3";

function Card({ style, children, ...props }) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ style, children, ...props }) {
  return (
    <div style={{ padding: 12, ...style }} {...props}>
      {children}
    </div>
  );
}

function CardContent({ style, children, ...props }) {
  return (
    <div style={{ padding: 12, ...style }} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ style, children, ...props }) {
  return (
    <div style={{ fontWeight: 700, ...style }} {...props}>
      {children}
    </div>
  );
}

function Input({ style, ...props }) {
  return (
    <input
      style={{
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #cbd5e1",
        outline: "none",
        ...style,
      }}
      {...props}
    />
  );
}

function Badge({ variant = "default", style, children, ...props }) {
  let baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "5px 9px",
    fontSize: 11,
    fontWeight: 700,
  };

  if (variant === "outline") {
    baseStyle = {
      ...baseStyle,
      border: "1px solid #cbd5e1",
      background: "#fff",
      color: "#334155",
    };
  } else if (variant === "secondary") {
    baseStyle = {
      ...baseStyle,
      background: "#e2e8f0",
      color: "#0f172a",
    };
  } else if (variant === "destructive") {
    baseStyle = {
      ...baseStyle,
      background: "#dc2626",
      color: "#fff",
    };
  } else {
    baseStyle = {
      ...baseStyle,
      background: "#0f172a",
      color: "#fff",
    };
  }

  return (
    <span style={{ ...baseStyle, ...style }} {...props}>
      {children}
    </span>
  );
}

function Checkbox({ checked, onCheckedChange, style, ...props }) {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => {
        e.stopPropagation();
        onCheckedChange?.(e.target.checked);
      }}
      style={{ width: 18, height: 18, cursor: "pointer", ...style }}
      {...props}
    />
  );
}

const ScrollArea = React.forwardRef(function ScrollArea(
  { style, children, ...props },
  ref
) {
  return (
    <div ref={ref} style={{ overflow: "auto", ...style }} {...props}>
      {children}
    </div>
  );
});

function Button({ variant = "default", style, children, ...props }) {
  const baseStyle = {
    padding: "9px 12px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    cursor: props.disabled ? "not-allowed" : "pointer",
    fontWeight: 700,
    opacity: props.disabled ? 0.55 : 1,
    fontSize: 13,
    whiteSpace: "nowrap",
  };

  const variantStyle =
    variant === "outline"
      ? { background: "#fff", color: "#0f172a" }
      : { background: "#0f172a", color: "#fff", border: "1px solid #0f172a" };

  return (
    <button style={{ ...baseStyle, ...variantStyle, ...style }} {...props}>
      {children}
    </button>
  );
}

function Separator() {
  return (
    <hr
      style={{
        border: 0,
        borderTop: "1px solid #e2e8f0",
        margin: "10px 0",
      }}
    />
  );
}

const supabaseUrl = "https://nobemjcugpxczqtqocai.supabase.co";
const supabaseAnonKey = "sb_publishable_7SiQ4eq7-gUorVG2OC0qxg_wKfSM3CW";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TARGET_HUB_ID = "69e18c814673b293b04be1ab"; // Chi nhánh 30/4

function formatPlatformOrderCode(platform, maDonSan) {
  const raw = String(maDonSan || "").trim();
  if (!raw) return "Không có mã sàn";

  const value = String(platform || "").toLowerCase();
  const last4 = raw.slice(-4);

  if (value.includes("shopee")) return `SF-${last4}`;
  if (
    value.includes("xanh_ngon") ||
    value.includes("xanh-ngon") ||
    value.includes("xanh ngon")
  ) {
    return `XN-${last4}`;
  }

  return raw;
}

function platformTheme(platform) {
  const value = String(platform || "").toLowerCase();

  if (
    value.includes("xanh_ngon") ||
    value.includes("xanh-ngon") ||
    value.includes("xanh ngon")
  ) {
    return {
      label: "Xanh Ngon",
      style: {
        border: "2px solid #14b8a6",
        background: "#ccfbf1",
        color: "#065f46",
      },
      badgeStyle: { background: "#0d9488", color: "#fff" },
      doneStyle: { background: "#99f6e4", color: "#064e3b" },
      actionStyle: {
        background: "#0d9488",
        color: "#fff",
        borderColor: "#0d9488",
      },
      accentStyle: { color: "#047857" },
    };
  }

  if (value.includes("grab")) {
    return {
      label: "Grab",
      style: {
        border: "2px solid #22c55e",
        background: "#dcfce7",
        color: "#166534",
      },
      badgeStyle: { background: "#16a34a", color: "#fff" },
      doneStyle: { background: "#bbf7d0", color: "#14532d" },
      actionStyle: {
        background: "#16a34a",
        color: "#fff",
        borderColor: "#16a34a",
      },
      accentStyle: { color: "#15803d" },
    };
  }

  if (value.includes("shopee")) {
    return {
      label: "Shopee",
      style: {
        border: "2px solid #ef4444",
        background: "#fee2e2",
        color: "#991b1b",
      },
      badgeStyle: { background: "#dc2626", color: "#fff" },
      doneStyle: { background: "#fecaca", color: "#7f1d1d" },
      actionStyle: {
        background: "#dc2626",
        color: "#fff",
        borderColor: "#dc2626",
      },
      accentStyle: { color: "#b91c1c" },
    };
  }

  return {
    label: platform || "Khác",
    style: {
      border: "2px solid #d1d5db",
      background: "#fff",
      color: "#374151",
    },
    badgeStyle: { background: "#374151", color: "#fff" },
    doneStyle: { background: "#e5e7eb", color: "#111827" },
    actionStyle: {
      background: "#374151",
      color: "#fff",
      borderColor: "#374151",
    },
    accentStyle: { color: "#374151" },
  };
}

function normalizeStatus(status) {
  if (!status) return "UNKNOWN";
  return String(status).toUpperCase();
}

function statusVariant(status) {
  const s = normalizeStatus(status);
  if (["FINISH", "COMPLETED", "DONE"].includes(s)) return "secondary";
  if (["CANCEL", "CANCELED", "CANCELLED"].includes(s)) return "destructive";
  if (["PREPARING", "COOKING", "IN_PROGRESS", "DOING", "READY"].includes(s))
    return "default";
  return "outline";
}

function buildDishKey(orderId, dish, index) {
  return `${orderId}__${index}__${dish?.ten_mon || dish?.name || "item"}`;
}

function getTimestampValue(value) {
  if (!value) return 0;
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    value instanceof Date
  ) {
    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  if (typeof value?.toDate === "function") {
    const parsed = value.toDate().getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  if (typeof value?.seconds === "number") {
    return value.seconds * 1000 + Math.floor((value.nanoseconds || 0) / 1000000);
  }
  return 0;
}

function formatTime(value) {
  const ts = getTimestampValue(value);
  if (!ts) return value ? String(value) : "";
  return new Date(ts).toLocaleString("vi-VN");
}

function normalizeDishName(dish) {
  return String(dish?.ten_mon || dish?.name || "Không tên món").trim();
}

function waitingTone(minutes) {
  if (minutes >= 15) return { color: "#dc2626" };
  if (minutes >= 8) return { color: "#d97706" };
  return { color: "#059669" };
}

function getOrderTimeValue(order) {
  return getTimestampValue(order?.thoi_gian);
}

function getOrderDateKey(order) {
  const ts = getOrderTimeValue(order);
  if (!ts) return "";
  const d = new Date(ts);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDateKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ensureDoneList(dish) {
  const qty = Number(dish?.so_luong ?? dish?.quantity ?? 0) || 0;
  const base = Array.isArray(dish?.doneList) ? [...dish.doneList] : [];
  while (base.length < qty) base.push(!!dish?.done);
  return base.slice(0, qty);
}

function isDishFullyDone(dish) {
  const qty = Number(dish?.so_luong ?? dish?.quantity ?? 0) || 0;
  if (qty <= 0) return !!dish?.done;
  const doneList = ensureDoneList(dish);
  return doneList.length === qty && doneList.every(Boolean);
}

function getOrderProgress(order) {
  const dishes = Array.isArray(order?.dishes) ? order.dishes : [];
  const totalItems = dishes.reduce(
    (sum, dish) => sum + (Number(dish?.quantity ?? dish?.so_luong ?? 1) || 0),
    0
  );
  const doneItems = dishes.reduce(
    (sum, dish) => sum + ensureDoneList(dish).filter(Boolean).length,
    0
  );
  return { totalItems, doneItems };
}

function computeOrderState(order, nowTs) {
  const dishes = Array.isArray(order?.dishes) ? order.dishes : [];
  const doneCount = dishes.filter((dish) => isDishFullyDone(dish)).length;
  const allDone = dishes.length > 0 && doneCount === dishes.length;

  const status = normalizeStatus(order?.trang_thai);
  const kitchenDone =
    !!order?.completed_at || ["FINISH", "COMPLETED", "DONE"].includes(status);

  const timeValue = getOrderTimeValue(order);
  const waitingMinutes = timeValue
    ? Math.max(0, Math.floor((nowTs - timeValue) / 60000))
    : 0;
  const isNew = waitingMinutes <= 5;
  const doneAtValue = getTimestampValue(order?.completed_at);

  return {
    ...order,
    _doneCount: doneCount,
    _allDone: allDone,
    _kitchenDone: kitchenDone,
    _waitingMinutes: waitingMinutes,
    _isNew: isNew,
    _timeValue: timeValue,
    _doneAtValue: doneAtValue,
  };
}

function orderContainsGroupedDish(order, dishKey) {
  if (!dishKey) return false;
  const dishes = Array.isArray(order?.dishes) ? order.dishes : [];
  return dishes.some((dish) => {
    const name = normalizeDishName(dish);
    const options = Array.isArray(dish?.tuy_chon) ? dish.tuy_chon : [];
    return `${name}__${options.join("|")}` === dishKey;
  });
}

function findOldestPendingOrderForDish(orders, dishKey) {
  const sortedPendingOrders = [...orders]
    .filter((order) => !order?._kitchenDone)
    .sort((a, b) => {
      const aTime = a?._timeValue || Number.POSITIVE_INFINITY;
      const bTime = b?._timeValue || Number.POSITIVE_INFINITY;
      return aTime - bTime;
    });

  for (let i = 0; i < sortedPendingOrders.length; i += 1) {
    const order = sortedPendingOrders[i];
    if (orderContainsGroupedDish(order, dishKey)) return order;
  }

  return null;
}

function getPendingDishKeysForOrder(order) {
  const dishes = Array.isArray(order?.dishes) ? order.dishes : [];
  return dishes
    .filter((dish) => {
      const qty = Number(dish?.so_luong ?? dish?.quantity ?? 0) || 0;
      const doneQuantity = ensureDoneList(dish).filter(Boolean).length;
      return Math.max(0, qty - doneQuantity) > 0;
    })
    .map((dish) => {
      const name = normalizeDishName(dish);
      const options = Array.isArray(dish?.tuy_chon) ? dish.tuy_chon : [];
      return `${name}__${options.join("|")}`;
    });
}

function groupDishesFromOrders(orders) {
  const map = new Map();

  const pendingOrdersByOldest = [...orders]
    .filter((order) => !order?._kitchenDone)
    .sort((a, b) => {
      const aTime = a?._timeValue || Number.POSITIVE_INFINITY;
      const bTime = b?._timeValue || Number.POSITIVE_INFINITY;
      return aTime - bTime;
    });

  pendingOrdersByOldest.forEach((order) => {
    const dishes = Array.isArray(order?.dishes) ? order.dishes : [];

    dishes.forEach((dish) => {
      const name = normalizeDishName(dish);
      const quantity = Number(dish?.so_luong ?? dish?.quantity ?? 0) || 0;
      const options = Array.isArray(dish?.tuy_chon) ? dish.tuy_chon : [];
      const note = dish?.ghi_chu || "";
      const key = `${name}__${options.join("|")}`;
      const doneList = ensureDoneList(dish);
      const doneQuantity = doneList.filter(Boolean).length;
      const pendingQuantity = Math.max(0, quantity - doneQuantity);

      if (!map.has(key)) {
        map.set(key, {
          key,
          name,
          totalQuantity: 0,
          pendingQuantity: 0,
          doneQuantity: 0,
          options: [],
          notes: [],
          oldestPendingTimeValue: Number.POSITIVE_INFINITY,
          firstPendingOrderTimeValue: Number.POSITIVE_INFINITY,
          firstPendingQuantity: 0,
        });
      }

      const group = map.get(key);
      group.totalQuantity += quantity;
      group.pendingQuantity += pendingQuantity;
      group.doneQuantity += doneQuantity;
      group.options.push(...options);

      if (pendingQuantity > 0) {
        const orderTime = order?._timeValue || Number.POSITIVE_INFINITY;
        if (orderTime < group.oldestPendingTimeValue) {
          group.oldestPendingTimeValue = orderTime;
        }
        if (group.firstPendingOrderTimeValue === Number.POSITIVE_INFINITY) {
          group.firstPendingOrderTimeValue = orderTime;
          group.firstPendingQuantity = pendingQuantity;
        }
      }

      if (note && pendingQuantity > 0) {
        group.notes.push({
          orderId: order.id,
          orderCode: formatPlatformOrderCode(
            order.nen_tang,
            order.ma_don_san || order.ma_noi_bo || order.id
          ),
          platform: order.nen_tang || "",
          text: note,
        });
      }
    });
  });

  return Array.from(map.values())
    .filter((group) => group.pendingQuantity > 0)
    .sort((a, b) => {
      if (a.firstPendingOrderTimeValue !== b.firstPendingOrderTimeValue) {
        return a.firstPendingOrderTimeValue - b.firstPendingOrderTimeValue;
      }
      if (b.firstPendingQuantity !== a.firstPendingQuantity) {
        return b.firstPendingQuantity - a.firstPendingQuantity;
      }
      if (b.pendingQuantity !== a.pendingQuantity) {
        return b.pendingQuantity - a.pendingQuantity;
      }
      return a.name.localeCompare(b.name, "vi");
    });
}

function miniOrderBoxStyle(order) {
  const theme = platformTheme(order.nen_tang);
  const kitchenDone = !!order?._kitchenDone;

  if (kitchenDone) {
    return {
      background: "#e5e7eb",
      border: "1px solid #cbd5e1",
      color: "#475569",
    };
  }

  return {
    background: theme.style?.background || "#ffffff",
    border: theme.style?.border || "1px solid #d1d5db",
    color: theme.style?.color || "#111827",
  };
}

function activeMiniOrderBoxStyle(order) {
  const value = String(order?.nen_tang || "").toLowerCase();
  const kitchenDone = !!order?._kitchenDone;

  if (kitchenDone) {
    return {
      border: "3px solid #64748b",
      background: "#e2e8f0",
      color: "#334155",
      boxShadow:
        "0 0 0 4px rgba(100,116,139,0.18), 0 8px 18px rgba(100,116,139,0.16)",
      waitColor: "#475569",
    };
  }

  if (
    value.includes("xanh_ngon") ||
    value.includes("xanh-ngon") ||
    value.includes("xanh ngon")
  ) {
    return {
      border: "3px solid #0f766e",
      background: "#ccfbf1",
      color: "#134e4a",
      boxShadow:
        "0 0 0 4px rgba(13,148,136,0.18), 0 8px 18px rgba(13,148,136,0.16)",
      waitColor: "#0f766e",
    };
  }

  if (value.includes("grab")) {
    return {
      border: "3px solid #16a34a",
      background: "#dcfce7",
      color: "#14532d",
      boxShadow:
        "0 0 0 4px rgba(34,197,94,0.18), 0 8px 18px rgba(34,197,94,0.16)",
      waitColor: "#15803d",
    };
  }

  if (value.includes("shopee")) {
    return {
      border: "3px solid #dc2626",
      background: "#fee2e2",
      color: "#991b1b",
      boxShadow:
        "0 0 0 4px rgba(239,68,68,0.18), 0 8px 18px rgba(239,68,68,0.16)",
      waitColor: "#b91c1c",
    };
  }

  return {
    border: "3px solid #374151",
    background: "#f3f4f6",
    color: "#111827",
    boxShadow:
      "0 0 0 4px rgba(55,65,81,0.14), 0 8px 18px rgba(55,65,81,0.12)",
    waitColor: "#374151",
  };
}

export default function App() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(() => getTodayDateKey());
  const [orderStateFilter, setOrderStateFilter] = useState("doing");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());
  const [activeDishKey, setActiveDishKey] = useState(null);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [pendingOrderIds, setPendingOrderIds] = useState({});
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [unseenOrderIds, setUnseenOrderIds] = useState([]);
  const [soundVolume, setSoundVolume] = useState(() => {
    if (typeof window === "undefined") return 0.4;
    const saved = window.localStorage.getItem("kitchen_sound_volume");
    const value = saved ? Number(saved) : 0.4;
    return Number.isFinite(value) ? value : 0.4;
  });

  const orderRefs = useRef({});
  const groupedDishRefs = useRef({});
  const groupedScrollRef = useRef(null);
  const titleFlashIntervalRef = useRef(null);
  const originalTitleRef = useRef(
    typeof document !== "undefined" ? document.title : "Bảng bếp realtime"
  );
  const audioRef = useRef(null);
  const ringingTimeoutRef = useRef(null);
  const isRingingRef = useRef(false);
  const unseenOrderIdsRef = useRef([]);

  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  const isLandscape = viewport.width >= viewport.height;

  const headerHeight = 146;
  const bodyHeight = `calc(100vh - ${headerHeight + 18}px)`;
  const leftMainHeight = `calc(100vh - ${headerHeight + 92}px)`;
  const rightMainHeight = `calc(100vh - ${headerHeight + 34}px)`;

  async function unlockAudio() {
    try {
      if (!audioRef.current) return;
      audioRef.current.loop = false;
      audioRef.current.volume = Math.max(0.15, Math.min(soundVolume * 4, 1));
      await audioRef.current.play();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      setSoundEnabled(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("kitchen_sound_enabled", "1");
      }
      setError("");
    } catch (err) {
      setError("Trình duyệt đang chặn âm thanh. Hãy bấm lại nút Bật chuông.");
    }
  }

  function stopTitleFlash() {
    if (titleFlashIntervalRef.current) {
      clearInterval(titleFlashIntervalRef.current);
      titleFlashIntervalRef.current = null;
    }
    if (typeof document !== "undefined") {
      document.title = originalTitleRef.current;
    }
  }

  function startTitleFlash(count) {
    if (typeof document === "undefined") return;
    stopTitleFlash();

    let showingAlert = true;
    document.title = `(${count}) Đơn mới!`;

    titleFlashIntervalRef.current = setInterval(() => {
      document.title = showingAlert
        ? `(${count}) Đơn mới!`
        : originalTitleRef.current;
      showingAlert = !showingAlert;
    }, 1000);
  }

  async function playNewOrderSound() {
    if (!soundEnabled) return;
    if (!audioRef.current) return;

    try {
      const volume = Math.max(0.15, Math.min(soundVolume * 4, 1));
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.loop = false;
      audioRef.current.volume = volume;
      await audioRef.current.play();
    } catch (err) {
      console.log("Không phát được chuông:", err);
    }
  }

  function stopContinuousRinging() {
    if (ringingTimeoutRef.current) {
      clearTimeout(ringingTimeoutRef.current);
      ringingTimeoutRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    isRingingRef.current = false;
  }

  async function startContinuousRinging() {
    if (!soundEnabled) return;
    if (!audioRef.current) return;
    if (isRingingRef.current) return;

    isRingingRef.current = true;
    const GAP_MS = 2200;

    const playLoop = async () => {
      if (!isRingingRef.current || !soundEnabled || !audioRef.current) return;

      if (!unseenOrderIdsRef.current || unseenOrderIdsRef.current.length === 0) {
        stopContinuousRinging();
        return;
      }

      await playNewOrderSound();

      const durationMs = Math.max(
        1200,
        Math.floor((audioRef.current.duration || 2) * 1000)
      );

      ringingTimeoutRef.current = setTimeout(() => {
        playLoop();
      }, durationMs + GAP_MS);
    };

    playLoop();
  }

  function markOrderAsSeen(orderId) {
    setUnseenOrderIds((prev) => {
      const next = prev.filter((id) => String(id) !== String(orderId));
      unseenOrderIdsRef.current = next;

      if (next.length === 0) {
        setNewOrderCount(0);
        stopTitleFlash();
        stopContinuousRinging();
      } else {
        setNewOrderCount(next.length);
        startTitleFlash(next.length);
      }

      return next;
    });
  }

  useEffect(() => {
    unseenOrderIdsRef.current = unseenOrderIds;
  }, [unseenOrderIds]);

  useEffect(() => {
    function handleResize() {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(tingSound);
    audioRef.current.preload = "auto";
    audioRef.current.playbackRate = 1.08;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("kitchen_sound_enabled", soundEnabled ? "1" : "0");
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("kitchen_sound_volume", String(soundVolume));
  }, [soundVolume]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedEnabled = window.localStorage.getItem("kitchen_sound_enabled") === "1";
    if (savedEnabled) setSoundEnabled(true);
  }, []);

  useEffect(() => {
    let alive = true;

    async function loadOrders() {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("hub_id", TARGET_HUB_ID)
          .order("thoi_gian", { ascending: false });

        if (error) throw error;

        if (alive) {
          setOrders(data || []);
          setError("");
        }
      } catch (err) {
        if (alive) setError(err.message || "Không đọc được Supabase");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadOrders();

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        async (payload) => {
          const insertedHubId = String(payload?.new?.hub_id || "").trim();
          if (insertedHubId !== TARGET_HUB_ID) return;

          const newId = payload?.new?.id;

          setUnseenOrderIds((prev) => {
            const normalizedId =
              newId !== undefined && newId !== null ? String(newId) : null;
            const exists = normalizedId
              ? prev.some((id) => String(id) === normalizedId)
              : false;

            const next = normalizedId && !exists ? [...prev, normalizedId] : prev;
            unseenOrderIdsRef.current = next;

            setNewOrderCount(next.length);
            if (next.length > 0) {
              startTitleFlash(next.length);
            }

            return next;
          });

          await startContinuousRinging();
          loadOrders();
        }
      )
      .subscribe();

    return () => {
      alive = false;
      supabase.removeChannel(channel);
    };
  }, [soundEnabled, soundVolume]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      stopTitleFlash();
      stopContinuousRinging();
    };
  }, []);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();

    return orders
      .map((order) => computeOrderState(order, now))
      .filter((order) => String(order.hub_id || "").trim() === TARGET_HUB_ID)
      .filter((order) => {
        const platform = String(order?.nen_tang || "").toLowerCase();
        if (platformFilter === "grab" && !platform.includes("grab")) return false;
        if (platformFilter === "shopee" && !platform.includes("shopee")) return false;
        if (
          platformFilter === "xanhngon" &&
          !(
            platform.includes("xanh_ngon") ||
            platform.includes("xanh-ngon") ||
            platform.includes("xanh ngon")
          )
        ) {
          return false;
        }
        if (dateFilter && getOrderDateKey(order) !== dateFilter) return false;
        if (orderStateFilter === "doing" && order._kitchenDone) return false;
        if (orderStateFilter === "done" && !order._kitchenDone) return false;
        if (!q) return true;

        const base = [
          order.ma_noi_bo,
          order.ma_don_san,
          order.khach_hang,
          order.sdt,
          order.nen_tang,
          order.trang_thai,
        ]
          .join(" ")
          .toLowerCase();

        const dishText = (order.dishes || [])
          .map((dish) =>
            [dish?.ten_mon, dish?.ghi_chu, ...(dish?.tuy_chon || [])].join(" ")
          )
          .join(" ")
          .toLowerCase();

        return `${base} ${dishText}`.includes(q);
      })
      .sort((a, b) => {
        const aDoing = !a._kitchenDone;
        const bDoing = !b._kitchenDone;

        if (aDoing !== bDoing) return aDoing ? -1 : 1;

        if (aDoing && bDoing) {
          const aTime = a._timeValue || 0;
          const bTime = b._timeValue || 0;
          if (aTime !== bTime) return aTime - bTime;
        }

        if (!aDoing && !bDoing) {
          const aDone = a._doneAtValue || 0;
          const bDone = b._doneAtValue || 0;
          if (aDone !== bDone) return bDone - aDone;
        }

        return String(a.ma_noi_bo || a.id).localeCompare(
          String(b.ma_noi_bo || b.id),
          "vi"
        );
      });
  }, [orders, search, platformFilter, dateFilter, orderStateFilter, now]);

  const groupedDishes = useMemo(() => {
    return groupDishesFromOrders(filteredOrders);
  }, [filteredOrders]);

  function setOrderPending(orderId, value) {
    setPendingOrderIds((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  }

  function scrollToOldestPendingOrderForDish(dishKey) {
    const targetOrder = findOldestPendingOrderForDish(filteredOrders, dishKey);
    if (!targetOrder) return;
    const node = orderRefs.current[targetOrder.id];
    if (node && typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }

  function scrollToFirstGroupedDishForOrder(order) {
    if (!order) return;

    const pendingDishKeys = getPendingDishKeysForOrder(order);
    if (!pendingDishKeys.length) return;

    const firstMatchedGroup = groupedDishes.find((group) =>
      pendingDishKeys.includes(group.key)
    );

    if (!firstMatchedGroup) return;

    const node = groupedDishRefs.current[firstMatchedGroup.key];
    const container = groupedScrollRef.current;

    if (node && container) {
      const containerRect = container.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();

      const top =
        container.scrollTop + (nodeRect.top - containerRect.top) - 20;

      container.scrollTo({
        top: Math.max(0, top),
        behavior: "auto",
      });
    }
  }

  async function updateDishPortion(orderId, dishIndex, portionIndex, checked, qty) {
    if (pendingOrderIds[orderId]) return;

    const previousOrders = orders;
    setOrderPending(orderId, true);

    const updatedOrders = orders.map((order) => {
      if (String(order.id) !== String(orderId)) return order;

      const dishesClone = [...(Array.isArray(order.dishes) ? order.dishes : [])];
      const currentDish = dishesClone[dishIndex];
      if (!currentDish) return order;

      const doneList = ensureDoneList({ ...currentDish, so_luong: qty });
      doneList[portionIndex] = Boolean(checked);

      dishesClone[dishIndex] = {
        ...currentDish,
        doneList,
        done: doneList.every(Boolean),
        done_at: doneList.every(Boolean) ? new Date().toISOString() : null,
      };

      const allDoneNow = dishesClone.every((dish) => isDishFullyDone(dish));

      const nextTrangThai = allDoneNow
        ? "READY"
        : normalizeStatus(order?.trang_thai) === "FINISH"
        ? "DOING"
        : order.trang_thai;

      return {
        ...order,
        dishes: dishesClone,
        trang_thai: nextTrangThai,
        completed_at: nextTrangThai === "DOING" ? null : order.completed_at,
      };
    });

    setOrders(updatedOrders);

    const updatedOrder = updatedOrders.find((o) => String(o.id) === String(orderId));
    if (!updatedOrder) {
      setOrderPending(orderId, false);
      return;
    }

    try {
      const { error } = await supabase
        .from("orders")
        .update({
          dishes: updatedOrder.dishes,
          trang_thai: updatedOrder.trang_thai,
          completed_at: updatedOrder.completed_at,
        })
        .eq("id", orderId)
        .eq("hub_id", TARGET_HUB_ID);

      if (error) throw error;
    } catch (err) {
      setOrders(previousOrders);
      setError(err.message || "Không cập nhật được món");
    } finally {
      setTimeout(() => {
        setOrderPending(orderId, false);
      }, 250);
    }
  }

  function handleDishCardToggle(orderId, dishIndex, portionIndex, isDone, qty) {
    if (pendingOrderIds[orderId]) return;
    updateDishPortion(orderId, dishIndex, portionIndex, !isDone, qty);
  }

  async function markOrderDone(orderId) {
    if (pendingOrderIds[orderId]) return;

    const previousOrders = orders;
    const doneAt = new Date().toISOString();

    setOrderPending(orderId, true);

    setOrders((prev) =>
      prev.map((order) =>
        String(order.id) === String(orderId)
          ? {
              ...order,
              trang_thai: "FINISH",
              completed_at: doneAt,
            }
          : order
      )
    );

    try {
      const { error } = await supabase
        .from("orders")
        .update({
          trang_thai: "FINISH",
          completed_at: doneAt,
        })
        .eq("id", orderId)
        .eq("hub_id", TARGET_HUB_ID);

      if (error) throw error;
    } catch (err) {
      setOrders(previousOrders);
      setError(err.message || "Không cập nhật được trạng thái đơn");
    } finally {
      setTimeout(() => {
        setOrderPending(orderId, false);
      }, 250);
    }
  }

  async function resetOrder(orderId) {
    if (pendingOrderIds[orderId]) return;

    const order = orders.find((o) => String(o.id) === String(orderId));
    if (!order) return;

    const previousOrders = orders;
    setOrderPending(orderId, true);

    const dishes = (Array.isArray(order.dishes) ? order.dishes : []).map((dish) => {
      const qty = Number(dish?.so_luong ?? dish?.quantity ?? 0) || 0;
      return {
        ...dish,
        done: false,
        done_at: null,
        doneList: Array.from({ length: qty }, () => false),
      };
    });

    setOrders((prev) =>
      prev.map((item) =>
        String(item.id) === String(orderId)
          ? {
              ...item,
              dishes,
              trang_thai: "DOING",
              completed_at: null,
            }
          : item
      )
    );

    try {
      const { error } = await supabase
        .from("orders")
        .update({
          dishes,
          trang_thai: "DOING",
          completed_at: null,
        })
        .eq("id", orderId)
        .eq("hub_id", TARGET_HUB_ID);

      if (error) throw error;
    } catch (err) {
      setOrders(previousOrders);
      setError(err.message || "Không reset được đơn");
    } finally {
      setTimeout(() => {
        setOrderPending(orderId, false);
      }, 250);
    }
  }

  if (!isLandscape) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <Card style={{ maxWidth: 420 }}>
          <CardContent>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Vui lòng xoay iPad ngang
            </div>
            <div style={{ color: "#64748b", fontSize: 15 }}>
              Bản này được tối ưu cố định cho iPad chạy ngang để toàn bộ thông tin
              hiển thị gọn trong một khuôn hình.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes newOrderBlink {
          0% { opacity: 1; }
          50% { opacity: 0.55; }
          100% { opacity: 1; }
        }
      `}</style>

      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#f8fafc",
          fontFamily: "Arial, sans-serif",
          padding: 8,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateRows: `${headerHeight}px 1fr`,
            gap: 10,
          }}
        >
          <Card style={{ overflow: "hidden" }}>
            <CardContent
              style={{
                padding: 10,
                height: "100%",
                boxSizing: "border-box",
                display: "grid",
                gridTemplateRows: "auto auto",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 220 }}>
                  <div style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>
                    Bảng bếp realtime
                  </div>
                  <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
                    Tối ưu ngang cho iPad Gen 5 • Chi nhánh 30/4
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ position: "relative", width: 250 }}>
                    <Search
                      size={16}
                      style={{
                        position: "absolute",
                        left: 10,
                        top: 12,
                        color: "#94a3b8",
                      }}
                    />
                    <Input
                      style={{
                        paddingLeft: 34,
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      placeholder="Tìm mã đơn, khách, món..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    style={{ width: 150 }}
                  />

                  <Button
                    variant={dateFilter === getTodayDateKey() ? "default" : "outline"}
                    onClick={() => setDateFilter(getTodayDateKey())}
                  >
                    Hôm nay
                  </Button>

                  <Button
                    variant={soundEnabled ? "default" : "outline"}
                    onClick={async () => {
                      if (soundEnabled) {
                        setSoundEnabled(false);
                        stopContinuousRinging();
                        if (typeof window !== "undefined") {
                          window.localStorage.setItem("kitchen_sound_enabled", "0");
                        }
                        return;
                      }
                      await unlockAudio();
                    }}
                  >
                    {soundEnabled ? (
                      <Bell size={16} style={{ marginRight: 6 }} />
                    ) : (
                      <BellOff size={16} style={{ marginRight: 6 }} />
                    )}
                    {soundEnabled ? "Tắt chuông" : "Bật chuông"}
                    {newOrderCount > 0 ? ` (${newOrderCount})` : ""}
                  </Button>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "0 10px",
                      background: "#fff",
                      border: "1px solid #cbd5e1",
                      borderRadius: 10,
                      height: 42,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#334155",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Âm lượng
                    </span>
                    <input
                      type="range"
                      min="0.05"
                      max="0.5"
                      step="0.01"
                      value={soundVolume}
                      onChange={(e) => setSoundVolume(Number(e.target.value))}
                      style={{ width: 92 }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        minWidth: 28,
                        textAlign: "right",
                      }}
                    >
                      {Math.round(soundVolume * 100)}
                    </span>
                  </div>

                  <Button variant="outline" onClick={() => window.location.reload()}>
                    <RefreshCcw size={16} style={{ marginRight: 6 }} />
                    Tải lại
                  </Button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Button
                  variant={platformFilter === "all" ? "default" : "outline"}
                  onClick={() => setPlatformFilter("all")}
                >
                  Tất cả
                </Button>
                <Button
                  variant={platformFilter === "grab" ? "default" : "outline"}
                  onClick={() => setPlatformFilter("grab")}
                >
                  Grab
                </Button>
                <Button
                  variant={platformFilter === "shopee" ? "default" : "outline"}
                  onClick={() => setPlatformFilter("shopee")}
                >
                  Shopee
                </Button>
                <Button
                  variant={platformFilter === "xanhngon" ? "default" : "outline"}
                  onClick={() => setPlatformFilter("xanhngon")}
                >
                  Xanh Ngon
                </Button>
                <Button
                  variant={orderStateFilter === "doing" ? "default" : "outline"}
                  onClick={() => setOrderStateFilter("doing")}
                >
                  Đang làm
                </Button>
                <Button
                  variant={orderStateFilter === "done" ? "default" : "outline"}
                  onClick={() => setOrderStateFilter("done")}
                >
                  Đã xong
                </Button>
                <Button
                  variant={orderStateFilter === "all" ? "default" : "outline"}
                  onClick={() => setOrderStateFilter("all")}
                >
                  Tất cả trạng thái
                </Button>
              </div>
            </CardContent>
          </Card>

          {error ? (
            <Card
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 5,
                border: "1px solid #fecaca",
                background: "#fef2f2",
                maxWidth: 360,
              }}
            >
              <CardContent style={{ color: "#b91c1c" }}>{error}</CardContent>
            </Card>
          ) : null}

          <div
            style={{
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: "1.6fr 0.95fr",
              gap: 10,
              height: bodyHeight,
            }}
          >
            <div
              style={{
                minHeight: 0,
                display: "grid",
                gridTemplateRows: "1fr 74px",
                gap: 10,
              }}
            >
              <div
                style={{
                  minHeight: 0,
                  overflowY: "auto",
                  overflowX: "hidden",
                  paddingRight: 4,
                  borderRadius: 16,
                }}
              >
                {loading ? (
                  <Card style={{ marginBottom: 10 }}>
                    <CardContent>Đang tải dữ liệu...</CardContent>
                  </Card>
                ) : null}

                <div style={{ display: "grid", gap: 10 }}>
                  {filteredOrders.map((order) => {
                    const dishes = Array.isArray(order.dishes) ? order.dishes : [];
                    const allDone = order._allDone;
                    const { totalItems, doneItems } = getOrderProgress(order);
                    const kitchenDone = order._kitchenDone;
                    const waitingMinutes = order._waitingMinutes;
                    const isNew = order._isNew;
                    const theme = platformTheme(order.nen_tang);
                    const isHighlightedByGroup = activeDishKey
                      ? orderContainsGroupedDish(order, activeDishKey)
                      : false;

                    const completedTheme = kitchenDone
                      ? {
                          style: {
                            border: "2px solid #cbd5e1",
                            background: "#e5e7eb",
                            color: "#475569",
                          },
                          badgeStyle: { background: "#64748b", color: "#fff" },
                          doneStyle: { background: "#cbd5e1", color: "#334155" },
                          actionStyle: {
                            background: "#64748b",
                            color: "#fff",
                            borderColor: "#64748b",
                          },
                          accentStyle: { color: "#475569" },
                        }
                      : theme;

                    const activeTheme = completedTheme;

                    return (
                      <Card
                        key={order.id}
                        ref={(node) => {
                          if (node) orderRefs.current[order.id] = node;
                          else delete orderRefs.current[order.id];
                        }}
                        style={{
                          ...activeTheme.style,
                          opacity: kitchenDone ? 0.9 : 1,
                          borderColor:
                            activeOrderId === order.id
                              ? "#8b5cf6"
                              : isHighlightedByGroup
                              ? "#0ea5e9"
                              : isNew && !kitchenDone
                              ? "#f59e0b"
                              : activeTheme.style.border?.split(" ").pop(),
                        }}
                      >
                        <CardHeader
                          style={{ cursor: "pointer", padding: 12 }}
                          onClick={() => {
                            const nextActiveOrderId =
                              activeOrderId === order.id ? null : order.id;

                            setActiveOrderId(nextActiveOrderId);
                            if (activeDishKey) setActiveDishKey(null);

                            markOrderAsSeen(String(order.id));

                            if (nextActiveOrderId) {
                              requestAnimationFrame(() => {
                                scrollToFirstGroupedDishForOrder(order);
                              });
                            }
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 10,
                            }}
                          >
                            <div>
                              <CardTitle style={{ fontSize: 22 }}>
                                {order.ma_noi_bo || order.id}
                              </CardTitle>
                              <div
                                style={{
                                  marginTop: 6,
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 6,
                                }}
                              >
                                <Badge style={activeTheme.badgeStyle}>{theme.label}</Badge>
                                {isNew ? (
                                  <Badge style={{ background: "#f59e0b", color: "#fff" }}>
                                    Đơn mới
                                  </Badge>
                                ) : null}
                                <Badge variant={statusVariant(order.trang_thai)}>
                                  {order.trang_thai || "UNKNOWN"}
                                </Badge>
                                {kitchenDone ? (
                                  <Badge variant="secondary">Đã xong đơn</Badge>
                                ) : null}
                              </div>
                            </div>

                            <div
                              style={{
                                textAlign: "right",
                                color: kitchenDone ? "#64748b" : "#475569",
                                minWidth: 92,
                              }}
                            >
                              <div style={{ fontSize: 20 }}>
                                {doneItems}/{totalItems}
                              </div>
                              <div style={{ fontSize: 12 }}>
                                {allDone ? "Sẵn sàng" : "Đang làm"}
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                              gap: 8,
                              marginTop: 10,
                              fontSize: 14,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                ...activeTheme.accentStyle,
                              }}
                            >
                              <Store size={16} />
                              <span
                                style={{
                                  fontSize: 18,
                                  fontWeight: 800,
                                  letterSpacing: 0.5,
                                  color: activeTheme.accentStyle?.color || "#0f172a",
                                }}
                              >
                                {formatPlatformOrderCode(order.nen_tang, order.ma_don_san)}
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <Phone size={15} />
                              <span>
                                {order.khach_hang || "Không tên"}
                                {order.sdt ? ` - ${order.sdt}` : ""}
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <Clock3 size={15} />
                              {formatTime(order.thoi_gian)}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                fontWeight: 700,
                                ...waitingTone(waitingMinutes),
                              }}
                            >
                              <AlarmClock size={15} />
                              Chờ {waitingMinutes} phút
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent style={{ padding: 12 }}>
                          <Separator />

                          <ScrollArea style={{ maxHeight: 188, paddingRight: 4 }}>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns:
                                  "repeat(auto-fit, minmax(165px, 1fr))",
                                gap: 10,
                              }}
                            >
                              {dishes.flatMap((dish, index) => {
                                const qty =
                                  Number(dish?.so_luong ?? dish?.quantity ?? 0) || 0;
                                const doneList = ensureDoneList(dish);

                                return Array.from({ length: qty }).map((_, portionIndex) => {
                                  const itemKey = `${buildDishKey(
                                    order.id,
                                    dish,
                                    index
                                  )}__${portionIndex}`;
                                  const isDone = !!doneList[portionIndex];

                                  return (
                                    <button
                                      key={itemKey}
                                      type="button"
                                      disabled={!!pendingOrderIds[order.id]}
                                      onClick={() => {
                                        handleDishCardToggle(
                                          order.id,
                                          index,
                                          portionIndex,
                                          isDone,
                                          qty
                                        );
                                      }}
                                      style={{
                                        width: "100%",
                                        background: "rgba(255,255,255,0.9)",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: 16,
                                        padding: 12,
                                        textAlign: "left",
                                        cursor: !!pendingOrderIds[order.id]
                                          ? "not-allowed"
                                          : "pointer",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: 10,
                                          alignItems: "flex-start",
                                        }}
                                      >
                                        <Checkbox
                                          checked={isDone}
                                          disabled={!!pendingOrderIds[order.id]}
                                          onCheckedChange={(checked) =>
                                            updateDishPortion(
                                              order.id,
                                              index,
                                              portionIndex,
                                              Boolean(checked),
                                              qty
                                            )
                                          }
                                          style={{ marginTop: 3 }}
                                        />

                                        <div style={{ flex: 1 }}>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              gap: 8,
                                            }}
                                          >
                                            <div>
                                              <div
                                                style={{
                                                  fontWeight: 700,
                                                  fontSize: 14,
                                                  color: isDone ? "#94a3b8" : "#0f172a",
                                                  textDecoration: isDone
                                                    ? "line-through"
                                                    : "none",
                                                }}
                                              >
                                                {dish?.ten_mon ||
                                                  dish?.name ||
                                                  "Không tên món"}
                                              </div>
                                              <div
                                                style={{
                                                  color: "#94a3b8",
                                                  fontSize: 11,
                                                }}
                                              >
                                                Phần {portionIndex + 1}
                                              </div>
                                            </div>
                                            {isDone ? (
                                              <Badge style={activeTheme.doneStyle}>Xong</Badge>
                                            ) : null}
                                          </div>

                                          {(dish?.tuy_chon || []).length > 0 ? (
                                            <div
                                              style={{
                                                marginTop: 8,
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 6,
                                              }}
                                            >
                                              {(dish?.tuy_chon || []).map((opt, optIndex) => (
                                                <Badge
                                                  key={`${itemKey}-${optIndex}`}
                                                  variant="outline"
                                                  onClick={(e) => e.stopPropagation()}
                                                >
                                                  {opt}
                                                </Badge>
                                              ))}
                                            </div>
                                          ) : null}

                                          {dish?.ghi_chu ? (
                                            <div
                                              onClick={(e) => e.stopPropagation()}
                                              style={{
                                                marginTop: 8,
                                                background: "#fef3c7",
                                                color: "#92400e",
                                                borderRadius: 10,
                                                padding: 8,
                                                fontSize: 12,
                                              }}
                                            >
                                              <div
                                                style={{
                                                  fontWeight: 700,
                                                  marginBottom: 3,
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: 5,
                                                }}
                                              >
                                                <StickyNote size={13} />
                                                Ghi chú
                                              </div>
                                              <div>{dish.ghi_chu}</div>
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                });
                              })}
                            </div>
                          </ScrollArea>

                          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                            <Button
                              style={{ ...activeTheme.actionStyle, flex: 1 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                markOrderDone(order.id);
                              }}
                              disabled={
                                dishes.length === 0 ||
                                !allDone ||
                                !!pendingOrderIds[order.id]
                              }
                            >
                              Xác nhận xong đơn
                            </Button>

                            <Button
                              variant="outline"
                              disabled={!!pendingOrderIds[order.id]}
                              onClick={(e) => {
                                e.stopPropagation();
                                resetOrder(order.id);
                              }}
                            >
                              Reset
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  overflowX: "auto",
                  overflowY: "hidden",
                  paddingTop: 2,
                  paddingBottom: 2,
                  width: "100%",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    flexWrap: "nowrap",
                    gap: 8,
                    minWidth: "max-content",
                  }}
                >
                  {filteredOrders.map((order) => {
                    const miniStyle = miniOrderBoxStyle(order);
                    const activeMiniStyle = activeMiniOrderBoxStyle(order);

                    const code = formatPlatformOrderCode(
                      order.nen_tang,
                      order.ma_don_san
                    );

                    const waiting = order?._waitingMinutes || 0;
                    const isActive = activeOrderId === order.id;
                    const isUnseen = unseenOrderIds.some(
                      (id) => String(id) === String(order.id)
                    );

                    return (
                      <button
                        key={`mini-${order.id}`}
                        type="button"
                        onClick={() => {
                          const node = orderRefs.current[order.id];
                          if (node && typeof node.scrollIntoView === "function") {
                            node.scrollIntoView({
                              behavior: "auto",
                              block: "center",
                            });
                          }

                          setActiveOrderId(order.id);
                          if (activeDishKey) setActiveDishKey(null);

                          markOrderAsSeen(String(order.id));

                          requestAnimationFrame(() => {
                            scrollToFirstGroupedDishForOrder(order);
                          });
                        }}
                        style={{
                          minWidth: 106,
                          height: 64,
                          flex: "0 0 auto",
                          borderRadius: 14,
                          padding: "10px 10px",
                          textAlign: "left",
                          fontWeight: 700,
                          cursor: "pointer",
                          border: isActive
                            ? activeMiniStyle.border
                            : miniStyle.border,
                          background: isActive
                            ? activeMiniStyle.background
                            : miniStyle.background,
                          color: isActive
                            ? activeMiniStyle.color
                            : miniStyle.color,
                          boxShadow: isActive
                            ? activeMiniStyle.boxShadow
                            : isUnseen
                            ? "0 0 0 3px rgba(245,158,11,0.35), 0 0 20px rgba(245,158,11,0.45)"
                            : "none",
                          transform: isActive
                            ? "translateY(-2px) scale(1.02)"
                            : isUnseen
                            ? "scale(1.03)"
                            : "none",
                          animation: isUnseen
                            ? "newOrderBlink 1s ease-in-out infinite"
                            : "none",
                          transition: "all 0.18s ease",
                          position: "relative",
                        }}
                      >
                        {isUnseen ? (
                          <div
                            style={{
                              position: "absolute",
                              top: 6,
                              right: 6,
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              background: "#ef4444",
                              boxShadow: "0 0 0 6px rgba(239,68,68,0.18)",
                            }}
                          />
                        ) : null}

                        <div
                          style={{
                            fontSize: 14,
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {code}
                        </div>

                        <div
                          style={{
                            marginTop: 8,
                            fontSize: 12,
                            fontWeight: isActive ? 700 : 600,
                            opacity: 1,
                            color: isActive
                              ? activeMiniStyle.waitColor
                              : undefined,
                          }}
                        >
                          Chờ {waiting}’
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Card
              style={{
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardHeader style={{ padding: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <ListOrdered size={18} />
                  <CardTitle style={{ fontSize: 20 }}>
                    Tổng hợp món đang làm
                  </CardTitle>
                </div>
                <p style={{ color: "#64748b", margin: "6px 0 0", fontSize: 13 }}>
                  Gom món giống nhau để bếp dễ làm theo lô.
                </p>
              </CardHeader>

              <CardContent style={{ padding: 12, paddingTop: 0, minHeight: 0, flex: 1 }}>
                <ScrollArea
                  ref={groupedScrollRef}
                  style={{
                    height: rightMainHeight,
                    minHeight: rightMainHeight,
                    maxHeight: rightMainHeight,
                    paddingRight: 4,
                  }}
                >
                  <div style={{ display: "grid", gap: 10 }}>
                    {groupedDishes.length === 0 ? (
                      <div
                        style={{
                          border: "1px dashed #cbd5e1",
                          borderRadius: 18,
                          padding: 16,
                          color: "#64748b",
                        }}
                      >
                        Chưa có món nào để tổng hợp.
                      </div>
                    ) : (
                      groupedDishes.map((group) => {
                        const activeOrder = activeOrderId
                          ? filteredOrders.find((o) => o.id === activeOrderId)
                          : null;
                        const orderDishKeys = activeOrder
                          ? getPendingDishKeysForOrder(activeOrder)
                          : [];
                        const isOrderHighlighted =
                          !!activeOrder && orderDishKeys.includes(group.key);

                        const activeOrderCode = activeOrder
                          ? formatPlatformOrderCode(
                              activeOrder.nen_tang,
                              activeOrder.ma_don_san ||
                                activeOrder.ma_noi_bo ||
                                activeOrder.id
                            )
                          : null;

                        const hasActiveOrderNote =
                          !!activeOrder &&
                          group.notes.some((note) => activeOrderCode === note.orderCode);

                        return (
                          <button
                            key={group.key}
                            ref={(node) => {
                              if (node) groupedDishRefs.current[group.key] = node;
                              else delete groupedDishRefs.current[group.key];
                            }}
                            type="button"
                            onClick={() => {
                              setActiveOrderId(null);
                              const nextKey =
                                activeDishKey === group.key ? null : group.key;
                              setActiveDishKey(nextKey);
                              if (nextKey) {
                                requestAnimationFrame(() =>
                                  scrollToOldestPendingOrderForDish(nextKey)
                                );
                              }
                            }}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              borderRadius: 16,
                              scrollMarginTop: 20,
                              border: `1px solid ${
                                activeDishKey === group.key
                                  ? "#0ea5e9"
                                  : isOrderHighlighted
                                  ? "#8b5cf6"
                                  : "#e2e8f0"
                              }`,
                              background:
                                activeDishKey === group.key
                                  ? "#f0f9ff"
                                  : isOrderHighlighted
                                  ? "#f5f3ff"
                                  : "#f8fafc",
                              padding: 12,
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 12,
                              }}
                            >
                              <div>
                                <div style={{ fontWeight: 700, fontSize: 17 }}>
                                  {group.name}
                                </div>
                                {Number.isFinite(group.oldestPendingTimeValue) &&
                                group.pendingQuantity > 0 ? (
                                  <div style={{ marginTop: 6 }}>
                                    <span
                                      style={{
                                        display: "inline-block",
                                        background: "#e2e8f0",
                                        color: "#0f172a",
                                        borderRadius: 999,
                                        padding: "5px 10px",
                                        fontSize: 12,
                                        fontWeight: 700,
                                      }}
                                    >
                                      {`Chờ lâu nhất: ${Math.max(
                                        0,
                                        Math.floor(
                                          (now - group.oldestPendingTimeValue) / 60000
                                        )
                                      )} phút`}
                                    </span>
                                  </div>
                                ) : null}

                                {group.options.length > 0 ? (
                                  <div
                                    style={{
                                      marginTop: 8,
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 6,
                                    }}
                                  >
                                    {Object.entries(
                                      group.options.reduce((acc, opt) => {
                                        acc[opt] = (acc[opt] || 0) + 1;
                                        return acc;
                                      }, {})
                                    )
                                      .sort((a, b) => b[1] - a[1])
                                      .map(([opt, qty], index) => (
                                        <Badge key={`${group.key}-${index}`} variant="outline">
                                          {opt}{" "}
                                          <span
                                            style={{ fontWeight: 700, color: "#475569" }}
                                          >
                                            (x{qty})
                                          </span>
                                        </Badge>
                                      ))}
                                  </div>
                                ) : null}
                              </div>

                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 28, fontWeight: 700 }}>
                                  {group.pendingQuantity}
                                </div>
                                <div style={{ color: "#64748b", fontSize: 13 }}>
                                  cần làm
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: 8,
                                marginTop: 12,
                              }}
                            >
                              <div
                                style={{
                                  background: "#fff",
                                  borderRadius: 12,
                                  padding: 10,
                                  textAlign: "center",
                                }}
                              >
                                <div style={{ fontWeight: 700 }}>{group.totalQuantity}</div>
                                <div style={{ fontSize: 12, color: "#64748b" }}>
                                  Tổng SL
                                </div>
                              </div>
                              <div
                                style={{
                                  background: "#fff",
                                  borderRadius: 12,
                                  padding: 10,
                                  textAlign: "center",
                                }}
                              >
                                <div style={{ fontWeight: 700, color: "#d97706" }}>
                                  {group.pendingQuantity}
                                </div>
                                <div style={{ fontSize: 12, color: "#64748b" }}>
                                  Chưa xong
                                </div>
                              </div>
                              <div
                                style={{
                                  background: "#fff",
                                  borderRadius: 12,
                                  padding: 10,
                                  textAlign: "center",
                                }}
                              >
                                <div style={{ fontWeight: 700, color: "#059669" }}>
                                  {group.doneQuantity}
                                </div>
                                <div style={{ fontSize: 12, color: "#64748b" }}>
                                  Đã xong
                                </div>
                              </div>
                            </div>

                            {group.notes.length > 0 ? (
                              <div
                                style={{
                                  marginTop: 12,
                                  borderRadius: 12,
                                  padding: 10,
                                  background: hasActiveOrderNote ? "#fef3c7" : "#fffbeb",
                                  border: hasActiveOrderNote
                                    ? "1px solid #fcd34d"
                                    : "none",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: "#92400e",
                                    marginBottom: 6,
                                  }}
                                >
                                  Ghi chú liên quan
                                </div>
                                <div style={{ display: "grid", gap: 6 }}>
                                  {group.notes.slice(0, 5).map((note, index) => {
                                    const noteTheme = platformTheme(note.platform);
                                    const isActiveOrderNote =
                                      activeOrder && activeOrderCode === note.orderCode;

                                    return (
                                      <div
                                        key={`${group.key}-note-${index}`}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start",
                                          gap: 8,
                                          borderRadius: 8,
                                          padding: "6px 8px",
                                          background: isActiveOrderNote
                                            ? "#fde68a"
                                            : "transparent",
                                          border: isActiveOrderNote
                                            ? "1px solid #f59e0b"
                                            : "none",
                                          opacity: isActiveOrderNote ? 1 : 0.5,
                                          color: "#92400e",
                                        }}
                                      >
                                        <span
                                          style={{
                                            marginTop: 2,
                                            display: "inline-block",
                                            borderRadius: 999,
                                            padding: "4px 8px",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: "#fff",
                                            ...noteTheme.badgeStyle,
                                          }}
                                        >
                                          {note.orderCode}
                                        </span>
                                        <span style={{ fontSize: 12 }}>{note.text}</span>
                                      </div>
                                    );
                                  })}
                                  {group.notes.length > 5 ? (
                                    <div style={{ fontSize: 12 }}>
                                      + {group.notes.length - 5} ghi chú khác
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}

                            <div
                              style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: "#64748b",
                              }}
                            >
                              {isOrderHighlighted
                                ? "Món này thuộc đơn đang chọn"
                                : activeDishKey === group.key
                                ? "Đang highlight các đơn chứa món này"
                                : "Bấm để highlight các đơn chứa món này"}
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}