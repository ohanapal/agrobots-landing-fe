const Feature = ({ tier, feature }) => {
  return (
    <td key={tier.id} className='py-5 md:py-8 px-2 md:px-5 text-base md:text-lg border border-l-0'>
      {typeof feature.tiers[tier.name] === 'string' ? (
        <div className='text-center text-sm leading-6'>{feature.tiers[tier.name]}</div>
      ) : (
        <>
          {feature.tiers[tier.name] === true ? (
            <div className='flex items-center justify-center'>
              <svg width='21' height='20' viewBox='0 0 21 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M11.7375 1.36104C10.8062 0.574966 9.4438 0.574967 8.51249 1.36104L7.66432 2.07692C7.26849 2.41102 6.77865 2.61394 6.2625 2.65759L5.15655 2.75111C3.94217 2.85381 2.97881 3.81717 2.87611 5.03155L2.78259 6.1375C2.73894 6.65365 2.53602 7.14349 2.20192 7.53934L1.48604 8.38749C0.699966 9.3188 0.699967 10.6812 1.48604 11.6125L2.20192 12.4607C2.53602 12.8565 2.73894 13.3464 2.78259 13.8625L2.87611 14.9685C2.97881 16.1829 3.94217 17.1462 5.15655 17.2489L6.2625 17.3424C6.77865 17.3861 7.26849 17.589 7.66434 17.9231L8.51249 18.639C9.4438 19.425 10.8062 19.425 11.7375 18.639L12.5857 17.9231C12.9815 17.589 13.4714 17.3861 13.9875 17.3424L15.0935 17.2489C16.3079 17.1462 17.2712 16.1829 17.3739 14.9685L17.4674 13.8625C17.5111 13.3464 17.714 12.8565 18.0481 12.4607L18.764 11.6125C19.55 10.6812 19.55 9.3188 18.764 8.38749L18.0481 7.53932C17.714 7.14349 17.5111 6.65365 17.4674 6.1375L17.3739 5.03155C17.2712 3.81717 16.3079 2.85381 15.0935 2.75111L13.9875 2.65759C13.4714 2.61394 12.9815 2.41102 12.5857 2.07692L11.7375 1.36104ZM14.671 8.29555C15.1104 7.85621 15.1104 7.1439 14.671 6.70456C14.2317 6.26521 13.5194 6.26521 13.08 6.70456L8.87554 10.9091L7.17104 9.20456C6.7317 8.76521 6.01939 8.76521 5.58005 9.20456C5.1407 9.6439 5.1407 10.3562 5.58005 10.7956L8.08005 13.2955C8.51939 13.7349 9.2317 13.7349 9.67104 13.2955L14.671 8.29555Z'
                  fill='#252430'
                />
              </svg>
            </div>
          ) : null}

          <span className='sr-only'>
            {feature.tiers[tier.name] === true ? 'Included' : 'Not included'} in {tier.name}
          </span>
        </>
      )}
    </td>
  )
}

export default function Comparison({ t, index }) {
  const selectedTier = t.tiers[index]
  return (
    <>
      {t.features.map(feature => (
        <tr key={feature.name} className='border border-l-0'>
          <th
            scope='row'
            className='py-5 md:py-8 px-2 md:px-5 text-base md:text-lg font-medium text-text-secondary leading-6 border border-l- 0'
          >
            {feature.name}
          </th>
          {index !== undefined ? (
            <Feature feature={feature} tier={selectedTier} />
          ) : (
            t.tiers.map(tier => <Feature key={tier.id} feature={feature} tier={tier} />)
          )}
        </tr>
      ))}
    </>
  )
}
