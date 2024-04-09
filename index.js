/* Your Code Here */

function createEmployeeRecord([firstName, familyName, title, payRate]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payRate,
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
  }

  function createTimeInEvent(timestamp) {
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(timestamp.slice(-4), 10),
      date: timestamp.split(' ')[0]
    });
    return this;
  }

  function createTimeOutEvent(timestamp) {
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(timestamp.slice(-4), 10),
      date: timestamp.split(' ')[0]
    });
    return this;
  }

  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }

  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

  const allWagesFor = function () {
      const eligibleDates = this.timeInEvents.map(function (e) {
          return e.date
      })

      const payable = eligibleDates.reduce(function (memo, d) {
          return memo + wagesEarnedOnDate.call(this, d)
      }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

      return payable
  }

  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }

  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor.call(employee), 0);
  }

  // Sample Employee Record Data
  const employeeRecordsData = [
    ['John', 'Doe', 'Manager', 20],
    ['Jane', 'Smith', 'Developer', 15]
  ];

  const employeeRecords = createEmployeeRecords(employeeRecordsData);

  // Sample Time Events
  createTimeInEvent.call(employeeRecords[0], '2022-03-01 0900');
  createTimeOutEvent.call(employeeRecords[0], '2022-03-01 1700');

  createTimeInEvent.call(employeeRecords[1], '2022-03-01 0800');
  createTimeOutEvent.call(employeeRecords[1], '2022-03-01 1600');

  // Testing the functions
  console.log(allWagesFor.call(employeeRecords[0])); // Expected output: 400
  console.log(allWagesFor.call(employeeRecords[1])); // Expected output: 240

  const totalPayroll = calculatePayroll(employeeRecords);
  console.log(totalPayroll); // Expected output: 640

  // Finding an employee by first name
  const foundEmployee = findEmployeeByFirstName(employeeRecords, 'Jane');
  console.log(foundEmployee); // Expected output: details of the employee with first name 'Jane'
