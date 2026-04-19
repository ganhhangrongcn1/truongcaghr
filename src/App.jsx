import React, { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { AlarmClock, Clock3, ListOrdered, Phone, RefreshCcw, Search, StickyNote, Store } from "lucide-react";

function Card({ className = "", style, children, ...props }) {
  return (
    <div
      className={className}
      style={{
        borderRadius: 24,
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

function CardHeader({ className = "", style, children, ...props }) {
  return (
    <div className={className} style={{ padding: 16, ...style }} {...props}>
      {children}
    </div>
  );
}

function CardContent({ className = "", style, children, ...props }) {
  return (
    <div className={className} style={{ padding: 16, ...style }} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className = "", style, children, ...props }) {
  return (
    <div className={className} style={{ fontWeight: 700, ...style }} {...props}>
      {children}
    </div>
  );
}

function Input({ className = "", style, ...props }) {
  return (
    <input
      className={className}
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

function Badge({ className = "", variant = "default", style, children, ...props }) {
  let baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
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
    <span className={className} style={{ ...baseStyle, ...style }} {...props}>
      {children}
    </span>
  );
}

function Checkbox({ checked, onCheckedChange, className = "", style, ...props }) {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={className}
      style={{ width: 18, height: 18, ...style }}
      {...props}
    />
  );
}

function ScrollArea({ className = "", style, children, ...props }) {
  return (
    <div className={className} style={{ overflow: "auto", ...style }} {...props}>
      {children}
    </div>
  );
}

function Button({ className = "", variant = "default", style, children, ...props }) {
  const baseStyle = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    cursor: props.disabled ? "not-allowed" : "pointer",
    fontWeight: 700,
    opacity: props.disabled ? 0.55 : 1,
  };

  const variantStyle =
    variant === "outline"
      ? { background: "#fff", color: "#0f172a" }
      : { background: "#0f172a", color: "#fff", border: "1px solid #0f172a" };

  return (
    <button className={className} style={{ ...baseStyle, ...variantStyle, ...style }} {...props}>
      {children}
    </button>
  );
}

function Separator() {
  return <hr style={{ border: 0, borderTop: "1px solid #e2e8f0", margin: "12px 0" }} />;
}

const supabaseUrl = "https://nobemjcugpxczqtqocai.supabase.co";
const supabaseAnonKey = "sb_publishable_7SiQ4eq7-gUorVG2OC0qxg_wKfSM3CW";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function platformTheme(platform) {
  const value = String(platform || "").toLowerCase();

  if (value.includes("grab")) {
    return {
      label: "Grab",
      cardClass: "grab-card",
      platformBadgeClass: "",
      accentTextClass: "",
      doneBadgeClass: "",
      actionButtonClass: "",
      style: {
        border: "2px solid #22c55e",
        background: "#dcfce7",
        color: "#166534",
      },
      badgeStyle: { background: "#16a34a", color: "#fff" },
      doneStyle: { background: "#bbf7d0", color: "#14532d" },
      actionStyle: { background: "#16a34a", color: "#fff", borderColor: "#16a34a" },
      accentStyle: { color: "#15803d" },
    };
  }

  if (value.includes("shopee")) {
    return {
      label: "Shopee",
      cardClass: "shopee-card",
      platformBadgeClass: "",
      accentTextClass: "",
      doneBadgeClass: "",
      actionButtonClass: "",
      style: {
        border: "2px solid #ef4444",
        background: "#fee2e2",
        color: "#991b1b",
      },
      badgeStyle: { background: "#dc2626", color: "#fff" },
      doneStyle: { background: "#fecaca", color: "#7f1d1d" },
      actionStyle: { background: "#dc2626", color: "#fff", borderColor: "#dc2626" },
      accentStyle: { color: "#b91c1c" },
    };
  }

  return {
    label: platform || "Khác",
    cardClass: "other-card",
    platformBadgeClass: "",
    accentTextClass: "",
    doneBadgeClass: "",
    actionButtonClass: "",
    style: {
      border: "2px solid #d1d5db",
      background: "#fff",
      color: "#374151",
    },
    badgeStyle: { background: "#374151", color: "#fff" },
    doneStyle: { background: "#e5e7eb", color: "#111827" },
    actionStyle: { background: "#374151", color: "#fff", borderColor: "#374151" },
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
  if (["PREPARING", "COOKING", "IN_PROGRESS", "DOING", "READY"].includes(s)) return "default";
  return "outline";
}

function buildDishKey(orderId, dish, index) {
  return `${orderId}__${index}__${dish?.ten_mon || dish?.name || "item"}`;
}

function getTimestampValue(value) {
  if (!value) return 0;
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
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
  const totalItems = dishes.reduce((sum, dish) => sum + (Number(dish?.quantity ?? dish?.so_luong ?? 1) || 0), 0);
  const doneItems = dishes.reduce((sum, dish) => sum + ensureDoneList(dish).filter(Boolean).length, 0);
  return { totalItems, doneItems };
}

function computeOrderState(order, nowTs) {
  const dishes = Array.isArray(order?.dishes) ? order.dishes : [];
  const doneCount = dishes.filter((dish) => isDishFullyDone(dish)).length;
  const allDone = dishes.length > 0 && doneCount === dishes.length;

  const status = normalizeStatus(order?.trang_thai);
  const kitchenDone = !!order?.completed_at || ["FINISH", "COMPLETED", "DONE"].includes(status);

  const timeValue = getOrderTimeValue(order);
  const waitingMinutes = timeValue ? Math.max(0, Math.floor((nowTs - timeValue) / 60000)) : 0;
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
          orderCode: order.ma_don_san || order.ma_noi_bo || order.id,
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

export default function App() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [orderStateFilter, setOrderStateFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(Date.now());
  const [activeDishKey, setActiveDishKey] = useState(null);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [pendingOrderIds, setPendingOrderIds] = useState({});
  const orderRefs = useRef({});
  const lastLocalUpdateRef = useRef(0);

  useEffect(() => {
    let alive = true;

    async function loadOrders() {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
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
        { event: "*", schema: "public", table: "orders" },
        () => {
          const nowTs = Date.now();
          if (nowTs - lastLocalUpdateRef.current < 1200) return;
          loadOrders();
        }
      )
      .subscribe();

    return () => {
      alive = false;
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();

    return orders
      .map((order) => computeOrderState(order, now))
      .filter((order) => {
        const platform = String(order?.nen_tang || "").toLowerCase();
        if (platformFilter === "grab" && !platform.includes("grab")) return false;
        if (platformFilter === "shopee" && !platform.includes("shopee")) return false;
        if (dateFilter && getOrderDateKey(order) !== dateFilter) return false;
        if (orderStateFilter === "doing" && order._kitchenDone) return false;
        if (orderStateFilter === "done" && !order._kitchenDone) return false;
        if (!q) return true;

        const base = [order.ma_noi_bo, order.ma_don_san, order.khach_hang, order.sdt, order.nen_tang, order.trang_thai]
          .join(" ")
          .toLowerCase();

        const dishText = (order.dishes || [])
          .map((dish) => [dish?.ten_mon, dish?.ghi_chu, ...(dish?.tuy_chon || [])].join(" "))
          .join(" ")
          .toLowerCase();

        return `${base} ${dishText}`.includes(q);
      })
      .sort((a, b) => {
        if (a._kitchenDone !== b._kitchenDone) return a._kitchenDone ? 1 : -1;

        const aTime = a._timeValue || Number.POSITIVE_INFINITY;
        const bTime = b._timeValue || Number.POSITIVE_INFINITY;

        if (aTime !== bTime) return aTime - bTime;

        return String(a.ma_noi_bo || a.id).localeCompare(String(b.ma_noi_bo || b.id), "vi");
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

  async function updateDishPortion(orderId, dishIndex, portionIndex, checked, qty) {
    if (pendingOrderIds[orderId]) return;

    const sourceOrder = orders.find((o) => o.id === orderId);
    if (!sourceOrder) return;

    const previousOrders = orders;
    lastLocalUpdateRef.current = Date.now();
    setOrderPending(orderId, true);

    const updatedOrders = orders.map((order) => {
      if (order.id !== orderId) return order;

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

    const updatedOrder = updatedOrders.find((o) => o.id === orderId);
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
        .eq("id", orderId);

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

  async function markOrderDone(orderId) {
    if (pendingOrderIds[orderId]) return;

    const previousOrders = orders;
    const doneAt = new Date().toISOString();

    lastLocalUpdateRef.current = Date.now();
    setOrderPending(orderId, true);

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
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
        .eq("id", orderId);

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

    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const previousOrders = orders;
    lastLocalUpdateRef.current = Date.now();
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
        item.id === orderId
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
        .eq("id", orderId);

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

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 12, fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 32 }}>Bảng bếp realtime</h1>
              <p style={{ margin: "8px 0 0", color: "#64748b" }}>Đơn hàng hiển thị realtime từ Supabase, tick món khi làm xong.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <div style={{ position: "relative", minWidth: 240 }}>
                  <Search size={16} style={{ position: "absolute", left: 10, top: 12, color: "#94a3b8" }} />
                  <Input
                    style={{ paddingLeft: 34, minWidth: 260 }}
                    placeholder="Tìm mã đơn, khách, món, ghi chú..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <Button variant={platformFilter === "all" ? "default" : "outline"} onClick={() => setPlatformFilter("all")}>Tất cả</Button>
                <Button variant={platformFilter === "grab" ? "default" : "outline"} onClick={() => setPlatformFilter("grab")}>Grab</Button>
                <Button variant={platformFilter === "shopee" ? "default" : "outline"} onClick={() => setPlatformFilter("shopee")}>Shopee</Button>
                <Button variant={orderStateFilter === "doing" ? "default" : "outline"} onClick={() => setOrderStateFilter("doing")}>Đang làm</Button>
                <Button variant={orderStateFilter === "done" ? "default" : "outline"} onClick={() => setOrderStateFilter("done")}>Đã xong</Button>
                <Button variant={orderStateFilter === "all" ? "default" : "outline"} onClick={() => setOrderStateFilter("all")}>Tất cả trạng thái</Button>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={{ width: 170 }} />
                <Button variant={dateFilter === getTodayDateKey() ? "default" : "outline"} onClick={() => setDateFilter(getTodayDateKey())}>Hôm nay</Button>
                <Button variant="outline" onClick={() => setDateFilter("")}>Bỏ lọc ngày</Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RefreshCcw size={16} style={{ marginRight: 6 }} />
                  Tải lại
                </Button>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <Card style={{ border: "1px solid #fecaca", background: "#fef2f2", marginBottom: 16 }}>
            <CardContent style={{ color: "#b91c1c" }}>{error}</CardContent>
          </Card>
        ) : null}

        {loading ? (
          <Card style={{ marginBottom: 16 }}>
            <CardContent>Đang tải dữ liệu...</CardContent>
          </Card>
        ) : null}

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.95fr", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 12 }}>
            {filteredOrders.map((order) => {
              const dishes = Array.isArray(order.dishes) ? order.dishes : [];
              const allDone = order._allDone;
              const { totalItems, doneItems } = getOrderProgress(order);
              const kitchenDone = order._kitchenDone;
              const waitingMinutes = order._waitingMinutes;
              const isNew = order._isNew;
              const theme = platformTheme(order.nen_tang);
              const isHighlightedByGroup = activeDishKey ? orderContainsGroupedDish(order, activeDishKey) : false;

              return (
                <Card
                  key={order.id}
                  ref={(node) => {
                    if (node) orderRefs.current[order.id] = node;
                    else delete orderRefs.current[order.id];
                  }}
                  style={{
                    ...theme.style,
                    opacity: kitchenDone ? 0.85 : 1,
                    borderColor: activeOrderId === order.id ? "#8b5cf6" : isHighlightedByGroup ? "#0ea5e9" : isNew && !kitchenDone ? "#f59e0b" : theme.style.border?.split(" ").pop(),
                  }}
                >
                  <CardHeader
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (activeOrderId === order.id) setActiveOrderId(null);
                      else setActiveOrderId(order.id);
                      if (activeDishKey) setActiveDishKey(null);
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <CardTitle style={{ fontSize: 26 }}>{order.ma_noi_bo || order.id}</CardTitle>
                        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 8 }}>
                          <Badge style={theme.badgeStyle}>{theme.label}</Badge>
                          {isNew ? <Badge style={{ background: "#f59e0b", color: "#fff" }}>Đơn mới</Badge> : null}
                          <Badge variant={statusVariant(order.trang_thai)}>{order.trang_thai || "UNKNOWN"}</Badge>
                          {kitchenDone ? <Badge variant="secondary">Đã xong đơn</Badge> : null}
                        </div>
                      </div>

                      <div style={{ textAlign: "right", color: kitchenDone ? "#64748b" : "#475569" }}>
                        <div style={{ fontSize: 22 }}>{doneItems}/{totalItems} phần</div>
                        <div>{allDone ? "Sẵn sàng trả đơn" : "Đang làm"}</div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gap: 8, marginTop: 14, fontSize: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, ...theme.accentStyle }}>
                        <Store size={16} />
                        {order.ma_don_san || "Không có mã sàn"}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Phone size={16} />
                        {order.khach_hang || "Không tên"} - {order.sdt || "Không SĐT"}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Clock3 size={16} />
                        {formatTime(order.thoi_gian)}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, ...waitingTone(waitingMinutes) }}>
                        <AlarmClock size={16} />
                        Chờ {waitingMinutes} phút
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Separator />

                    <ScrollArea style={{ maxHeight: 260, paddingRight: 6 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                        {dishes.flatMap((dish, index) => {
                          const qty = Number(dish?.so_luong ?? dish?.quantity ?? 0) || 0;
                          const doneList = ensureDoneList(dish);

                          return Array.from({ length: qty }).map((_, portionIndex) => {
                            const itemKey = `${buildDishKey(order.id, dish, index)}__${portionIndex}`;
                            const isDone = !!doneList[portionIndex];

                            return (
                              <div
                                key={itemKey}
                                style={{
                                  background: "rgba(255,255,255,0.9)",
                                  border: "1px solid #e2e8f0",
                                  borderRadius: 18,
                                  padding: 14,
                                }}
                              >
                                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                  <Checkbox
                                    checked={isDone}
                                    disabled={!!pendingOrderIds[order.id]}
                                    onClick={(e) => e.stopPropagation()}
                                    onCheckedChange={(checked) => updateDishPortion(order.id, index, portionIndex, Boolean(checked), qty)}
                                    style={{ marginTop: 4 }}
                                  />

                                  <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                                      <div>
                                        <div
                                          style={{
                                            fontWeight: 700,
                                            fontSize: 16,
                                            color: isDone ? "#94a3b8" : "#0f172a",
                                            textDecoration: isDone ? "line-through" : "none",
                                          }}
                                        >
                                          {dish?.ten_mon || dish?.name || "Không tên món"}
                                        </div>
                                        <div style={{ color: "#94a3b8", fontSize: 12 }}>Phần {portionIndex + 1}</div>
                                      </div>
                                      {isDone ? <Badge style={theme.doneStyle}>Xong</Badge> : null}
                                    </div>

                                    {(dish?.tuy_chon || []).length > 0 ? (
                                      <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
                                        {(dish?.tuy_chon || []).map((opt, optIndex) => (
                                          <Badge key={`${itemKey}-${optIndex}`} variant="outline">
                                            {opt}
                                          </Badge>
                                        ))}
                                      </div>
                                    ) : null}

                                    {dish?.ghi_chu ? (
                                      <div style={{ marginTop: 10, background: "#fef3c7", color: "#92400e", borderRadius: 12, padding: 10, fontSize: 13 }}>
                                        <div style={{ fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                                          <StickyNote size={14} />
                                          Ghi chú
                                        </div>
                                        <div>{dish.ghi_chu}</div>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        })}
                      </div>
                    </ScrollArea>

                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                      <Button
                        style={{ ...theme.actionStyle, flex: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          markOrderDone(order.id);
                        }}
                        disabled={dishes.length === 0 || !allDone || !!pendingOrderIds[order.id]}
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

          <Card style={{ position: "sticky", top: 12, height: "fit-content" }}>
            <CardHeader>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ListOrdered size={18} />
                <CardTitle style={{ fontSize: 22 }}>Tổng hợp món đang làm</CardTitle>
              </div>
              <p style={{ color: "#64748b", margin: "8px 0 0" }}>
                Gom các món giống nhau từ tất cả đơn đang hiển thị để bếp dễ chế biến theo lô.
              </p>
            </CardHeader>

            <CardContent>
              <ScrollArea style={{ maxHeight: 700, paddingRight: 6 }}>
                <div style={{ display: "grid", gap: 12 }}>
                  {groupedDishes.length === 0 ? (
                    <div style={{ border: "1px dashed #cbd5e1", borderRadius: 18, padding: 16, color: "#64748b" }}>
                      Chưa có món nào để tổng hợp.
                    </div>
                  ) : (
                    groupedDishes.map((group) => {
                      const activeOrder = activeOrderId ? filteredOrders.find((o) => o.id === activeOrderId) : null;
                      const orderDishKeys = activeOrder ? getPendingDishKeysForOrder(activeOrder) : [];
                      const isOrderHighlighted = !!activeOrder && orderDishKeys.includes(group.key);

                      return (
                        <button
                          key={group.key}
                          type="button"
                          onClick={() => {
                            setActiveOrderId(null);
                            const nextKey = activeDishKey === group.key ? null : group.key;
                            setActiveDishKey(nextKey);
                            if (nextKey) requestAnimationFrame(() => scrollToOldestPendingOrderForDish(nextKey));
                          }}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            borderRadius: 18,
                            border: `1px solid ${activeDishKey === group.key ? "#0ea5e9" : isOrderHighlighted ? "#8b5cf6" : "#e2e8f0"}`,
                            background: activeDishKey === group.key ? "#f0f9ff" : isOrderHighlighted ? "#f5f3ff" : "#f8fafc",
                            padding: 14,
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 18 }}>{group.name}</div>
                              {Number.isFinite(group.oldestPendingTimeValue) && group.pendingQuantity > 0 ? (
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
                                    {`Chờ lâu nhất: ${Math.max(0, Math.floor((now - group.oldestPendingTimeValue) / 60000))} phút`}
                                  </span>
                                </div>
                              ) : null}

                              {group.options.length > 0 ? (
                                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
                                  {Object.entries(
                                    group.options.reduce((acc, opt) => {
                                      acc[opt] = (acc[opt] || 0) + 1;
                                      return acc;
                                    }, {})
                                  )
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([opt, qty], index) => (
                                      <Badge key={`${group.key}-${index}`} variant="outline">
                                        {opt} <span style={{ fontWeight: 700, color: "#475569" }}>(x{qty})</span>
                                      </Badge>
                                    ))}
                                </div>
                              ) : null}
                            </div>

                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 30, fontWeight: 700 }}>{group.pendingQuantity}</div>
                              <div style={{ color: "#64748b", fontSize: 13 }}>cần làm</div>
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12 }}>
                            <div style={{ background: "#fff", borderRadius: 12, padding: 10, textAlign: "center" }}>
                              <div style={{ fontWeight: 700 }}>{group.totalQuantity}</div>
                              <div style={{ fontSize: 12, color: "#64748b" }}>Tổng SL</div>
                            </div>
                            <div style={{ background: "#fff", borderRadius: 12, padding: 10, textAlign: "center" }}>
                              <div style={{ fontWeight: 700, color: "#d97706" }}>{group.pendingQuantity}</div>
                              <div style={{ fontSize: 12, color: "#64748b" }}>Chưa xong</div>
                            </div>
                            <div style={{ background: "#fff", borderRadius: 12, padding: 10, textAlign: "center" }}>
                              <div style={{ fontWeight: 700, color: "#059669" }}>{group.doneQuantity}</div>
                              <div style={{ fontSize: 12, color: "#64748b" }}>Đã xong</div>
                            </div>
                          </div>

                          {group.notes.length > 0 ? (
                            <div
                              style={{
                                marginTop: 12,
                                borderRadius: 12,
                                padding: 10,
                                background:
                                  activeOrder &&
                                  group.notes.some((note) => (activeOrder.ma_don_san || activeOrder.ma_noi_bo || activeOrder.id) === note.orderCode)
                                    ? "#fef3c7"
                                    : "#fffbeb",
                                border:
                                  activeOrder &&
                                  group.notes.some((note) => (activeOrder.ma_don_san || activeOrder.ma_noi_bo || activeOrder.id) === note.orderCode)
                                    ? "1px solid #fcd34d"
                                    : "none",
                              }}
                            >
                              <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 6 }}>Ghi chú liên quan</div>
                              <div style={{ display: "grid", gap: 6 }}>
                                {group.notes.slice(0, 5).map((note, index) => {
                                  const noteTheme = platformTheme(note.platform);
                                  const isActiveOrderNote =
                                    activeOrder &&
                                    (activeOrder.ma_don_san || activeOrder.ma_noi_bo || activeOrder.id) === note.orderCode;

                                  return (
                                    <div
                                      key={`${group.key}-note-${index}`}
                                      style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 8,
                                        borderRadius: 8,
                                        padding: "6px 8px",
                                        background: isActiveOrderNote ? "#fef3c7" : "transparent",
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
                                {group.notes.length > 5 ? <div style={{ fontSize: 12 }}>+ {group.notes.length - 5} ghi chú khác</div> : null}
                              </div>
                            </div>
                          ) : null}

                          <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>
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
  );
}