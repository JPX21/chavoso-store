"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, QrCode } from "lucide-react"
import { useState } from "react"

interface PixData {
  chavePix: string
  codigoPix: string
  qrCode: string
  valor: string
  beneficiario: string
  cnpj: string
  pagador: string
  dataExpiracao: string
  identificador: string
}

interface PixModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pix: PixData | null
}

export function PixModal({ open, onOpenChange, pix }: PixModalProps) {
  const [copiedChave, setCopiedChave] = useState(false)
  const [copiedCodigo, setCopiedCodigo] = useState(false)

  if (!pix) return null

  const copyToClipboard = (text: string, type: "chave" | "codigo") => {
    navigator.clipboard.writeText(text)
    if (type === "chave") {
      setCopiedChave(true)
      setTimeout(() => setCopiedChave(false), 2000)
    } else {
      setCopiedCodigo(true)
      setTimeout(() => setCopiedCodigo(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <QrCode className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            Pagamento via PIX
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <Card className="p-4 sm:p-6 bg-primary/5">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <img
                  src={pix.qrCode || "/placeholder.svg"}
                  alt="QR Code PIX"
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-4 border-primary rounded-lg"
                />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Escaneie o QR Code com o app do seu banco</p>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Ou copie a chave PIX</h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={pix.chavePix}
                  readOnly
                  className="flex-1 px-3 py-2 bg-muted rounded-md text-xs sm:text-sm font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(pix.chavePix, "chave")}
                  className="w-full sm:w-auto"
                >
                  {copiedChave ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Cole esta chave no app do seu banco para fazer o pagamento
              </p>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Código PIX Copia e Cola</h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  value={pix.codigoPix}
                  readOnly
                  rows={3}
                  className="flex-1 px-3 py-2 bg-muted rounded-md text-xs font-mono resize-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(pix.codigoPix, "codigo")}
                  className="w-full sm:w-auto"
                >
                  {copiedCodigo ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-card/50">
            <h3 className="font-semibold mb-4 text-sm sm:text-base">Detalhes do Pagamento</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Beneficiário:</span>
                <span className="font-medium">{pix.beneficiario}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CNPJ:</span>
                <span className="font-medium">{pix.cnpj}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pagador:</span>
                <span className="font-medium">{pix.pagador}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base sm:text-lg">
                <span className="font-semibold">Valor:</span>
                <span className="font-bold text-primary">R$ {pix.valor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expira em:</span>
                <span className="font-medium text-orange-600">{pix.dataExpiracao}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Identificador:</span>
                <span className="font-medium font-mono text-xs">{pix.identificador}</span>
              </div>
            </div>
          </Card>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
              <strong>Importante:</strong> Após realizar o pagamento, aguarde alguns instantes para a confirmação. Você
              receberá um e-mail com os detalhes da compra.
            </p>
          </div>

          <Button onClick={() => onOpenChange(false)} className="w-full" size="lg">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
