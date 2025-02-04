document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const queues = ["Sales", "Support", "Technical", "Billing"];
    const queueContainer = document.getElementById("queues");
    let selectedQueue = "Sales";

    queues.forEach(queue => {
        const button = document.createElement("button");
        button.textContent = queue;
        button.classList.add("queue-button");
        button.onclick = () => {
            selectedQueue = queue;
            document.querySelectorAll(".queue-button").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        };
        queueContainer.appendChild(button);
    });

    document.getElementById("toggle-dark-mode").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    document.getElementById("toggle-filters").addEventListener("click", () => {
        document.getElementById("filters").classList.toggle("hidden");
    });

    document.getElementById("close-filters").addEventListener("click", () => {
        document.getElementById("filters").classList.add("hidden");
    });

    const notificationsContainer = document.getElementById("notifications");
    setInterval(() => {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = Math.random() > 0.5
            ? "SLA Breach: Call waiting exceeds 5 minutes"
            : "High Abandon Rate Alert!";
        notificationsContainer.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }, 10000);

    document.getElementById("export-data").addEventListener("click", () => {
        const data = {
            queue: selectedQueue,
            metrics: {
                activeCalls: 24,
                avgWaitTime: "1m 45s",
                availableAgents: "12/15"
            }
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "call-report.json";
        link.click();
    });

    const ctx = document.getElementById("callChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["09:00", "10:00", "11:00", "12:00", "13:00"],
            datasets: [
                {
                    label: "Total Calls",
                    data: [23, 35, 45, 30, 28],
                    borderColor: "blue",
                    fill: false
                },
                {
                    label: "Wait Time (s)",
                    data: [45, 62, 78, 55, 48],
                    borderColor: "orange",
                    fill: false
                },
                {
                    label: "Abandoned",
                    data: [2, 4, 6, 3, 2],
                    borderColor: "red",
                    fill: false
                }
            ]
        }
    });
});
