import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  TextInput,
  Button,
  Pressable
} from 'react-native'
import { classes } from './AppClasses'
import AsyncStorage from '@react-native-async-storage/async-storage'

function App(): React.JSX.Element {

  const [inputText, setInputText] = useState('')
  const [nombreStorage, setNombreStorage] = useState('')

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', inputText)
      setNombreStorage(inputText)
    }
    catch (error) {
      console.log(error)
    }
  }

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre') ?? ''
      setNombreStorage(nombre)
    }
    catch (error) {
      console.log(error)
    }
  }

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre')
      setNombreStorage('')
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerDatosStorage()
  }, [])

  return (
    <>
      <View style={classes.contenedor}>
        {nombreStorage &&
          <Text>Hola: {nombreStorage}</Text>
        }

        <TextInput
          placeholder='Escribe tu Nombre'
          style={classes.input}
          onChangeText={texto => setInputText(texto)}
        />

        <Button
          title='Guardar'
          color='#333'
          onPress={() => guardarDatos()}
        />

        {nombreStorage &&
          <Pressable
            style={classes.btnEliminar}
            onPress={() => eliminarDatos()}
          >
            <Text style={classes.textoEliminar}>Eliminar Nombre &times;</Text>
          </Pressable>
        }
      </View>
    </>
  )
}

export default App
