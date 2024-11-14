// components/common/Dialog/CommonDialog.tsx
import { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface CommonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  showCloseButton?: boolean
  closeButtonLabel?: string
  onClose?: () => void
  className?: string
  buttonClassName?: string
}

export function CommonModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  closeButtonLabel,
  onClose,
  className,
  buttonClassName,
}: CommonModalProps) {
  const handleClose = () => {
    onClose?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        {(title || description) && (
          <DialogHeader className="border-b-2">
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}

        {(footer || showCloseButton) && (
          <DialogFooter>
            {footer}
            {showCloseButton && (
              <Button
                variant="outline"
                onClick={handleClose}
                className={buttonClassName}
              >
                {closeButtonLabel}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
