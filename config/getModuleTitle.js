// utils/getModuleTitle.js
  // const title = getModuleTitle(current_module_key, t)

export const getModuleTitle = (current_module_key, t) => {
  let title

  switch (current_module_key) {
    case 'home_services':
      title = t('Home services')
      break

    case 'car_services':
      title = t('Car services')
      break

    case 'street_assistant':
      title = t('Road services')
      break

    case 'property_rental':
      title = t('Renting houses')
      break

    case 'queue':
      title = t('Restaurant reservations')
      break

    case 'delivery':
      title = t('Delivery services')
      break
  }

  return title
}