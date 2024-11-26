import { cn } from '@/lib/utils'
import { forwardRef, useEffect, useRef } from 'react'
import { Label } from './label'

const Textarea = forwardRef(
  (
    {
      containerClassName,
      className,
      icon,
      errors,
      register,
      name,
      hookFormConfig,
      label,
      labelClassName,
      showLabel,
      required,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef(null)

    useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [textareaRef?.current?.value])

    const textareaProps = register ? { ...register(name, { required, ...hookFormConfig }), ...props } : { ...props }

    return (
      <div className={cn(containerClassName, { 'flex flex-col gap-y-2': label && showLabel })}>
        {label && showLabel && (
          <Label className={cn('text-text-tartiary', labelClassName)}>
            {label}
            {required ? '*' : null}
          </Label>
        )}
        <div className='relative'>
          <textarea
            className={cn(
              'flex align-middle min-h-[80px] max-h-72 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
              { 'pl-10': icon },
              className
            )}
            ref={ref || textareaRef}
            {...textareaProps}
          />
          {icon && (
            <div
              className={cn(
                'absolute inset-y-0 left-2.5 top-0 flex items-center [&>svg]:size-6 text-muted-foreground',
                {}
              )}
            >
              {icon}
            </div>
          )}
        </div>
        {required ? (
          <>
            {errors[name] && errors[name]?.type === 'required' ? (
              <span className='text-red-500 text-xs h-5 leading-none'>{label} is required</span>
            ) : (
              <div className='w-full h-5' />
            )}
          </>
        ) : null}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
