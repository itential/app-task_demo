const exec = require('child_process').exec;
const crypto = require('crypto');

class TaskDemo {
  constructor() {
    log.trace("TaskDemo Application loading");
  }



   /**
   * Test task
   * @pronghornType method
   * @name testTask
   * @summary test task
   *
   * @param {string} input
   * @return {string} output
   * @task true
   * @route {POST} /testTask
   * @roles admin engineering
   */
    testTask(input, callback) {
        log.trace(`testTask => input: ${input}`);

        let output = input;

        try {
            return callback(output);
        } catch (e) {
            log.error(`testTask => error: ${e}`);
            return callback(null, e);
        }
    }

} //close class


module.exports = new TaskDemo();