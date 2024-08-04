const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const EntityInfo = sequelize.define(
    "EntityInfo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      created_dt: {
        type: DataTypes.DATE,
      },
      data_source_modified_dt: {
        type: DataTypes.DATE,
      },
      entity_type: {
        type: DataTypes.STRING,
      },
      operating_status: {
        type: DataTypes.STRING,
      },
      legal_name: {
        type: DataTypes.STRING,
      },
      dba_name: {
        type: DataTypes.STRING,
      },
      physical_address: {
        type: DataTypes.TEXT,
      },
      p_street: {
        type: DataTypes.STRING,
      },
      p_city: {
        type: DataTypes.STRING,
      },
      p_state: {
        type: DataTypes.STRING,
      },
      p_zip_code: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      mailing_address: {
        type: DataTypes.TEXT,
      },
      m_street: {
        type: DataTypes.STRING,
      },
      m_city: {
        type: DataTypes.STRING,
      },
      m_state: {
        type: DataTypes.STRING,
      },
      m_zip_code: {
        type: DataTypes.STRING,
      },
      usdot_number: {
        type: DataTypes.STRING,
      },
      mc_mx_ff_number: {
        type: DataTypes.STRING,
      },
      power_units: {
        type: DataTypes.INTEGER,
      },
      mcs_150_form_date: {
        type: DataTypes.DATE,
      },
      out_of_service_date: {
        type: DataTypes.DATE,
      },
      state_carrier_id_number: {
        type: DataTypes.STRING,
      },
      duns_number: {
        type: DataTypes.STRING,
      },
      drivers: {
        type: DataTypes.INTEGER,
      },
      mcs_150_mileage_year: {
        type: DataTypes.INTEGER,
      },
      credit_score: {
        type: DataTypes.INTEGER,
      },
      record_status: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  return EntityInfo;
};
