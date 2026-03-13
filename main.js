const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    let startParts = startTime.trim().split(' ');
    let endParts = endTime.trim().split(' ');
    let [sh, sm, ss] = startParts[0].split(':').map(Number);
    let [eh, em, es] = endParts[0].split(':').map(Number);
    let sp = startParts[1].toLowerCase();
    let ep = endParts[1].toLowerCase();

    if (sp === 'pm' && sh !== 12) sh += 12;
    else if (sp === 'am' && sh === 12) sh = 0;
    if (ep === 'pm' && eh !== 12) eh += 12;
    else if (ep === 'am' && eh === 12) eh = 0;

    let totalSeconds = (eh * 3600 + em * 60 + es) - (sh * 3600 + sm * 60 + ss);
    if (totalSeconds < 0) totalSeconds += 24 * 3600;

    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {
    let startParts = startTime.trim().split(' ');
    let endParts = endTime.trim().split(' ');
    let [sh, sm, ss] = startParts[0].split(':').map(Number);
    let [eh, em, es] = endParts[0].split(':').map(Number);
    let sp = startParts[1].toLowerCase();
    let ep = endParts[1].toLowerCase();

    if (sp === 'pm' && sh !== 12) sh += 12;
    else if (sp === 'am' && sh === 12) sh = 0;
    if (ep === 'pm' && eh !== 12) eh += 12;
    else if (ep === 'am' && eh === 12) eh = 0;

    let startSec = sh * 3600 + sm * 60 + ss;
    let endSec = eh * 3600 + em * 60 + es;
    if (endSec < startSec) endSec += 24 * 3600;

    let deliveryStart = 8 * 3600;
    let deliveryEnd = 22 * 3600;

    let idleBefore = startSec < deliveryStart ? Math.min(endSec, deliveryStart) - startSec : 0;
    let idleAfter = endSec > deliveryEnd ? endSec - Math.max(startSec, deliveryEnd) : 0;
    let totalSeconds = idleBefore + idleAfter;

    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {
    let [sh, sm, ss] = shiftDuration.split(':').map(Number);
    let [ih, im, is_] = idleTime.split(':').map(Number);
    let totalSeconds = (sh * 3600 + sm * 60 + ss) - (ih * 3600 + im * 60 + is_);
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    let [year, month, day] = date.split('-').map(Number);
    let isEid = year === 2025 && month === 4 && day >= 10 && day <= 30;
    let quota = isEid ? 6 * 3600 : 8 * 3600 + 24 * 60;
    let [h, m, s] = activeTime.split(':').map(Number);
    return (h * 3600 + m * 60 + s) >= quota;
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    // TODO: Implement this function
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
