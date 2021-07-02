const config = require("../../routes/skills/configDates");

module.exports = async (agenda) => {
	const now = Date.now();
	agenda.cancel({ name: { $in: ["week start"] } });
	if (now < config.eventStart)
		await agenda.schedule(config.eventStart, "week start", { weekNo: 0 });
	for (let i = 0; i < config.maxWeekNos; i++) {
		if (now < config.weekStart.getTime() + i * config.weekInterval)
			await agenda.schedule(
				config.weekStart.getTime() + i * config.weekInterval,
				"week start",
				{ weekNo: i + 1 }
				
			);
	}
};
