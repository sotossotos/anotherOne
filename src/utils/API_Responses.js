const Responses = {
  /**
   *
   * @param {Number} statusCode
   * @param {Object} data
   * @returns {Object}
   */
  _DefineResponse (statusCode = 502, data = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      },
      statusCode,
      body: JSON.stringify(data)
    }
  },
  /**
   *
   * @param {Object} data
   * @returns {Responses}
   */
  _200 (data = {}) {
    return this._DefineResponse(200, data)
  },
  /**
   *
   * @param {Object} data
   * @returns {Responses}
   */
  _400 (data = {}) {
    return this._DefineResponse(400, data)
  },
  /**
   *
   * @param {Object} data
   * @returns {Responses}
   */
  _404 (data = {}) {
    return this._DefineResponse(404, data)
  },
  /**
   *
   * @param {Object} data
   * @returns {Responses}
   */
  _500 (data = {}) {
    return this._DefineResponse(500, data)
  }
}

module.exports = Responses
