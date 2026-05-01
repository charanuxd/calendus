import { getIllustration } from '../lib/design-system'

export function BookingIllustration({ colors, size = '120px' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: getIllustration.booking(colors),
      }}
    />
  )
}

export function RoutinesIllustration({ colors, size = '120px' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: getIllustration.routines(colors),
      }}
    />
  )
}

export function CalendarIllustration({ colors, size = '120px' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: getIllustration.calendar(colors),
      }}
    />
  )
}

export function SuccessIllustration({ colors, size = '80px' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: getIllustration.success(colors),
      }}
    />
  )
}

export function EmptyStateIllustration({ colors, size = '120px' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      dangerouslySetInnerHTML={{
        __html: getIllustration.empty(colors),
      }}
    />
  )
}
