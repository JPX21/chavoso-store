"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Copy, Download, Check } from "lucide-react"
import { useState } from "react"

interface BoletoData {
  codigoBarras: string
  linhaDigitavel: string
  dataVencimento: string
  valor: string
  beneficiario: string
  cnpj: string
  pagador: string
  cpfPagador: string
  numeroDocumento: string
  nossoNumero: string
  agencia: string
  conta: string
}

interface BoletoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  boleto: BoletoData | null
}

export function BoletoModal({ open, onOpenChange, boleto }: BoletoModalProps) {
  const [copied, setCopied] = useState(false)

  if (!boleto) return null

  const copyLinhaDigitavel = () => {
    navigator.clipboard.writeText(boleto.linhaDigitavel.replace(/\s/g, ""))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadBoleto = () => {
    // Simular download do boleto
    alert("Em um sistema real, aqui seria gerado um PDF do boleto para download.")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Boleto Bancário Gerado</DialogTitle>
        </DialogHeader>

        <Card className="p-6 bg-background border-2">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded">
                <p className="text-sm text-muted-foreground">Banco</p>
                <p className="text-xl font-bold">001 - Banco do Brasil</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Beneficiário</p>
                <p className="font-semibold">{boleto.beneficiario}</p>
                <p className="text-xs text-muted-foreground">CNPJ: {boleto.cnpj}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Agência/Conta</p>
                <p className="font-semibold">{boleto.agencia}</p>
                <p className="text-xs text-muted-foreground">Conta: {boleto.conta}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Data de Vencimento</p>
                <p className="font-semibold text-lg text-destructive">{boleto.dataVencimento}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Valor do Documento</p>
                <p className="font-semibold text-lg text-primary">R$ {boleto.valor}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Número do Documento</p>
                <p className="font-semibold">{boleto.numeroDocumento}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Nosso Número</p>
                <p className="font-semibold">{boleto.nossoNumero}</p>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground mb-2">Pagador</p>
              <p className="font-semibold">{boleto.pagador}</p>
              <p className="text-sm text-muted-foreground">CPF: {boleto.cpfPagador}</p>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground mb-2">Linha Digitável</p>
              <div className="bg-muted p-3 rounded font-mono text-sm break-all">{boleto.linhaDigitavel}</div>
              <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" onClick={copyLinhaDigitavel}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Linha Digitável
                  </>
                )}
              </Button>
            </div>

            <div className="bg-muted/50 p-4 rounded text-xs text-muted-foreground">
              <p className="font-semibold mb-2">Instruções:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Pagável em qualquer banco até a data de vencimento</li>
                <li>Após o vencimento, cobrar multa de 2% e juros de 1% ao mês</li>
                <li>Este é um boleto fictício para demonstração</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button onClick={downloadBoleto} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Baixar Boleto PDF
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Fechar
              </Button>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
