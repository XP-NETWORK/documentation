---
sidebar_label: '9. WAGMI Library'
sidebar_position: 9
image: /cover-image.png
description: The Most Powerful Multi-Chain NFT bridge
---

# WAGMI Library

Connecting wallets to a decentralized application (dApp) is critical in providing a seamless and user-friendly experience for your users. This is why we were looking for the optimal solution and came accross Wagmi. The Wagmi library simplifies this process, enabling swift integration with popular wallets like MetaMask, WalletConnect, and Coinbase Wallet. In this document, we'll guide you through the implementation using Wagmi, showcasing how to set up the library, configure connectors, and manage wallet interactions in your React application.

## Setting Up Wagmi Configurations

The initial code snippet demonstrates the setup of the Wagmi library. It imports necessary modules, including Wagmi configurations, providers, and connectors. Notably, Alchemy and public providers are configured for Ethereum's mainnet. Connectors for MetaMask, Coinbase Wallet, WalletConnect, and Injected are initialized.
The Wagmi configuration is created, setting parameters like auto-connect, available connectors, and public clients. Finally, the configuration is passed to the WagmiConfig React Context Provider, encapsulating the setup.

```ts
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
)

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

// Pass config to React Context Provider
function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  )
}

```

## Profile Component with Connect Button
The second code snippet presents a React component named "Profile" that utilizes the useConnect hook from Wagmi. It renders buttons for each connector, allowing users to initiate wallet connections. Connector availability and connection status are dynamically reflected in the UI. Any errors during the connection attempt are also displayed.

```ts
import { useConnect } from 'wagmi'

export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}

```

## Profile Component with Connected State

The third code snippet extends the "Profile" component to handle the connected state. It utilizes additional Wagmi hooks such as useAccount, useDisconnect, useEnsAvatar, and useEnsName to retrieve and display user information. If connected, the component shows the user's EnsAvatar, EnsName (if available), connected wallet details, and a disconnect button.

```ts
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

export function Profile() {
  const { address, connector, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <img src={ensAvatar} alt="ENS Avatar" />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        <div>Connected to {connector.name}</div>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  )
}

```

## Conclusion

In conclusion, Wagmi streamlines the integration of wallet functionality into an app. By utilizing the provided connectors and hooks, developers can offer users a variety of wallet options with minimal effort. The concise and modular nature of Wagmi's code makes it a valuable tool for those seeking an efficient and user-friendly solution for wallet integration in their decentralized applications. With the demonstrated code snippets, connecting wallets through Wagmi becomes an accessible task, allowing developers to focus on enhancing the overall user experience of their dApps.