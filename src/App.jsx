import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    nombre: '', celular: '', departamento: '', ciudad: '', direccion: ''
  })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setEnviado(true)
      }
    } catch (error) {
      console.error("Error enviando pedido:", error)
      alert("Error al procesar el pedido. Intenta de nuevo.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Sección del Producto */}
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden mb-8">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Rodillera de Compresión Pro</h1>
          <p className="text-gray-400 mb-6">Soporte lateral reforzado. Ideal para basket y recuperación.</p>
          <div className="text-4xl font-black text-green-400 mb-4">$85.000 COP</div>
          <div className="inline-block bg-gray-700 text-sm px-3 py-1 rounded-full text-gray-300">
            🚚 Envío Gratis - Pagas al recibir
          </div>
        </div>
      </div>

      {/* Formulario de Pago Contra Entrega */}
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-xl font-bold mb-6 text-center">Pide ahora y paga en casa</h2>
        
        {enviado ? (
          <div className="text-center py-10 text-green-400">
            <h3 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h3>
            <p className="text-gray-300">Te escribiremos por WhatsApp para confirmar el despacho a tu dirección.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nombre Completo</label>
              <input required type="text" name="nombre" onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Celular (Para confirmar por WhatsApp)</label>
              <input required type="tel" name="celular" onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-green-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Departamento</label>
                <input required type="text" name="departamento" onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ciudad</label>
                <input required type="text" name="ciudad" onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-green-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Dirección Exacta (Barrio, calle, apto)</label>
              <input required type="text" name="direccion" onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-green-500" />
            </div>
            
            <button type="submit" 
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg py-4 rounded-lg mt-4 transition-colors">
              CONFIRMAR PEDIDO
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default App