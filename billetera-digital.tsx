'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, PlusCircle, Wallet } from 'lucide-react'

export default function BilleteraDigital() {
  const [saldo, setSaldo] = useState(1000000) // Saldo inicial de 1,000,000 COP
  const [monto, setMonto] = useState('')

  const formatearDinero = (cantidad: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(cantidad)
  }

  const enviarDinero = () => {
    const cantidad = Number(monto)
    if (cantidad > 0 && cantidad <= saldo) {
      setSaldo(saldo - cantidad)
      setMonto('')
      alert(`Has enviado ${formatearDinero(cantidad)} exitosamente.`)
    } else {
      alert('Monto inválido o saldo insuficiente.')
    }
  }

  const recargarCuenta = () => {
    const cantidad = Number(monto)
    if (cantidad > 0) {
      setSaldo(saldo + cantidad)
      setMonto('')
      alert(`Has recargado ${formatearDinero(cantidad)} exitosamente.`)
    } else {
      alert('Por favor ingresa un monto válido.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Mi Billetera Digital</CardTitle>
          <CardDescription className="text-center">Tu dinero, siempre contigo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <Wallet className="w-12 h-12 mx-auto mb-2 text-primary" />
            <h2 className="text-xl font-semibold">Saldo Disponible</h2>
            <p className="text-3xl font-bold text-primary">{formatearDinero(saldo)}</p>
          </div>
          <Tabs defaultValue="enviar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enviar">Enviar Dinero</TabsTrigger>
              <TabsTrigger value="recargar">Recargar</TabsTrigger>
            </TabsList>
            <TabsContent value="enviar">
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Monto a enviar"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
                <Button className="w-full" onClick={enviarDinero}>
                  Enviar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="recargar">
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Monto a recargar"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
                <Button className="w-full" onClick={recargarCuenta}>
                  Recargar <PlusCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Transacciones seguras y rápidas, al estilo Nequi
        </CardFooter>
      </Card>
    </div>
  )
}