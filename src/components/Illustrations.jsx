import { ILLUSTRATIONS } from '../lib/design-system'

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
        __html: ILLUSTRATIONS.booking(colors),
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
        __html: ILLUSTRATIONS.routines(colors),
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
        __html: ILLUSTRATIONS.calendar(colors),
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
        __html: ILLUSTRATIONS.success(colors),
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
        __html: ILLUSTRATIONS.empty(colors),
      }}
    />
  )
}
