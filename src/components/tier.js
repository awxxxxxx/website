import React from 'react'

const Profiles = [
  {
    profile_name: 'Developer Tier',
    tikv: {
      storage: 10,
      hourly_cost: null,
      monthly_cost: null,
      pp_hourly_cost: null,
      pp_monthly_cost: null,
      cpu: 8,
      shared_cpu: true,
    },
    tidb: {
      storage: null,
      hourly_cost: null,
      monthly_cost: null,
      pp_hourly_cost: null,
      pp_monthly_cost: null,
      cpu: 8,
      shared_cpu: true,
    },
    tiflash: {
      storage: 10,
      hourly_cost: null,
      monthly_cost: null,
      pp_hourly_cost: null,
      pp_monthly_cost: null,
      cpu: 8,
      shared_cpu: true,
    },
  },
  {
    profile_name: 'T3.Standard',
    tikv: {
      storage: 1024,
      hourly_cost: '1.83',
      monthly_cost: '1,314',
      pp_hourly_cost: '1.28',
      pp_monthly_cost: '919.80',
      cpu: 8,
    },
    tidb: {
      storage: null,
      hourly_cost: '0.85',
      monthly_cost: '612',
      pp_hourly_cost: '0.60',
      pp_monthly_cost: '428.40',
      cpu: 8,
    },
  },
  {
    profile_name: 'H3.Standard',
    tikv: {
      storage: 1024,
      hourly_cost: '1.83',
      monthly_cost: '1,314',
      pp_hourly_cost: '1.28',
      pp_monthly_cost: '919.80',
      cpu: 8,
    },
    tidb: {
      storage: null,
      hourly_cost: '0.85',
      monthly_cost: '612',
      pp_hourly_cost: '0.60',
      pp_monthly_cost: '428.40',
      cpu: 8,
    },
    tiflash: {
      storage: 1024,
      hourly_cost: '1.89',
      monthly_cost: '1,360.80',
      pp_hourly_cost: '1.32',
      pp_monthly_cost: '952.56',
      cpu: 8,
    },
  },
]

const value = (v) => (v !== null && v !== undefined ? '$' + v : 'Free')

const TierCells = ({ instance, name }) => {
  const {
    storage,
    hourly_cost,
    monthly_cost,
    pp_hourly_cost,
    pp_monthly_cost,
    cpu,
    shared_cpu,
  } = instance
  return (
    <>
      <td>{name}</td>
      <td>{storage === null ? '-' : storage + ' GB'}</td>
      <td>{value(hourly_cost)}</td>
      <td>{value(monthly_cost)}</td>
      <td>{value(pp_hourly_cost)}</td>
      <td>{value(pp_monthly_cost)}</td>
      <td>{`${cpu} vCPU${shared_cpu ? ' shared' : ''}`}</td>
    </>
  )
}

const Tier = () => {
  const TierTableRow = ({ tier, isStriped }) => {
    if (!tier) return null

    const { profile_name, tidb, tikv, tiflash } = tier

    return (
      <>
        <tr className={`${isStriped ? 'has-light-background' : ''}`}>
          <td rowSpan={`${tiflash ? '3' : '2'}`} className="tier-td">
            {profile_name}
          </td>
          <TierCells name="TiKV" instance={tikv} />
        </tr>
        <tr className={`${isStriped ? 'has-light-background' : ''}`}>
          <TierCells name="TiDB" instance={tidb} />
        </tr>
        {tiflash && (
          <tr className={`${isStriped ? 'has-light-background' : ''}`}>
            <TierCells name="TiFlash" instance={tiflash} />
          </tr>
        )}
      </>
    )
  }

  return (
    <div className="tidb-cloud-hourly-usage">
      <div className="table-container">
        <table className="table is-bordered comparison-table is-fullwidth">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Node</th>
              <th>Storage</th>
              <th>Hourly Cost Per Node</th>
              <th>Monthly Cost Per Node</th>
              <th>Public Preview: Hourly Cost Per Node</th>
              <th>Public Preview: Monthly Cost Per Node</th>
              <th>CPU</th>
            </tr>
          </thead>
          <tbody>
            {Profiles.map((p, index) => (
              <TierTableRow
                key={p.profile_name}
                tier={p}
                isStriped={index % 2}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tier
