document.addEventListener("DOMContentLoaded", function () {
    
    const inputs = document.querySelectorAll("input");
    const monthlyRevEl = document.getElementById("monthlyRevenue");
    const yearlyRevEl = document.getElementById("yearlyRevenue");
    const totalExpensesEl = document.getElementById("totalExpenses");
    const netProfitEl = document.getElementById("netProfit");
    const partnerPercentEl = document.getElementById("partnerPercent");
    const partnerTakeEl = document.getElementById("partnerTake");
    const yourTakeEl = document.getElementById("yourTake");

    const ctx = document.getElementById("profitChart").getContext("2d");

    let chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Monthly Profit"],
            datasets: [{
                label: "Profit",
                data: [0],
                backgroundColor: "#4973ff"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function calculate() {
        let occupancy = parseFloat(document.getElementById("occRate").value) || 0;
        let adrWeek = parseFloat(document.getElementById("adrWeek").value) || 0;
        let adrWeekend = parseFloat(document.getElementById("adrWeekend").value) || 0;

        let expInputs = document.querySelectorAll(".exp");
        let totalExpenses = 0;

        expInputs.forEach(e => {
            totalExpenses += parseFloat(e.value) || 0;
        });

        // Revenue calculations
        let nightsMonth = 30 * (occupancy / 100);
        let weekendNights = nightsMonth * 0.30;  
        let weekdayNights = nightsMonth * 0.70;  

        let revenue =
            weekdayNights * adrWeek +
            weekendNights * adrWeekend;

        let yearlyRevenue = revenue * 12;
        let netProfit = revenue - totalExpenses;

        // Update HTML UI
        monthlyRevEl.textContent = "$" + revenue.toFixed(2);
        yearlyRevEl.textContent = "$" + yearlyRevenue.toFixed(2);
        totalExpensesEl.textContent = "$" + totalExpenses.toFixed(2);
        netProfitEl.textContent = "$" + netProfit.toFixed(2);

        // Partnership model
        let percent = parseFloat(partnerPercentEl.value) || 0;
        let partnerCut = (netProfit * percent) / 100;
        let yourCut = netProfit - partnerCut;

        partnerTakeEl.textContent = "$" + partnerCut.toFixed(2);
        yourTakeEl.textContent = "$" + yourCut.toFixed(2);

        // Update chart
        chart.data.datasets[0].data = [netProfit];
        chart.update();
    }

    inputs.forEach(input => {
        input.addEventListener("input", calculate);
    });

    calculate();
});
