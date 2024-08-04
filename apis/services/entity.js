const { EntityInfo } = require("../config/db");
const { respond } = require("../helpers/common");

module.exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case "GET":
      return getEntityInfo(event, context);
    default:
      return respond(context, { message: "Method Not Allowed" }, 405);
  }
};

const getEntityInfo = async (event, context) => {
  try {
    let {
      entity_type,
      operating_status,
      legal_name,
      dba_name,
      physical_address,
      phone,
      usdot_number,
      mc_mx_ff_number,
      power_units,
      created_dt,
      data_source_modified_dt,
      out_of_service_date,
      page = 1,
      limit = 10
    } = event.queryStringParameters || {};

    if (limit > 20) limit = 20;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (entity_type) whereClause.entity_type = entity_type;
    if (operating_status) whereClause.operating_status = operating_status;
    if (legal_name) whereClause.legal_name = legal_name;
    if (dba_name) whereClause.dba_name = dba_name;
    if (physical_address) whereClause.physical_address = physical_address;
    if (phone) whereClause.phone = phone;
    if (usdot_number) whereClause.usdot_number = usdot_number;
    if (mc_mx_ff_number) whereClause.mc_mx_ff_number = mc_mx_ff_number;
    if (power_units) whereClause.power_units = power_units;
    if (created_dt) whereClause.created_dt = created_dt;
    if (data_source_modified_dt) whereClause.data_source_modified_dt = data_source_modified_dt;
    if (out_of_service_date) whereClause.out_of_service_date = out_of_service_date;

    const entityInfos = await EntityInfo.findAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });
    const totalCount = await EntityInfo.count({ where: whereClause });
    return respond(context, {
      data: entityInfos,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page, 10),
      },
    });
  } catch (error) {
    console.error("Error getting entity info:", error);
    return respond(context, { message: "Internal Server Error" }, 500);
  }
};
