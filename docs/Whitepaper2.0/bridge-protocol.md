---
sidebar_label: 'Bridge Protocol'
sidebar_position: 6
---

# XP.network Bridge Protocol: a technical overview

Back in 1943, Warren McCulloch and Walter Pitts published a fundamental paper on state machines – abstract devices that are always in one (and only one) out of a set number of stable states, depending on their previous state and on the inputs they receive. The paper describes several types of such finite-state machines:

Acceptors can either accept an input or not
Recognizers can recognize an input or not
Transducers can generate output from a given input
The concept of finite-state machines can be applied to the XP.network bridge validators:

A validator has a finite set of states S = {s1 … ss} - [idle, handling an event, paused, signing a transaction, reverting a transaction]

There is a finite finite set of inputs that a validator can receive: either events broadcast by the smart contracts or results of computations (inputs I = {i1 … iJ})

There is also a finite set of output symbols O = {o1 … oo} - [none, signature, smart contract address, +/- Validator credentials]
States and inputs are mapped onto the so-called state transition function to determine the next state: I x S → S’

Inputs and states are also mapped onto the output function to determine the output: I x S -> O

The table below synthesizes all the possible combinations of validator states, inputs, outputs, and resulting states that can be produced. Each of these combinations corresponds to one of the state machine types: acceptor, recognizer, or transducer.

Current State (Sx) |	Input (Ix) |	Output (Ox)	 | Next State (S’)
|:---:|:---:|:---:|:---:|
|Validator as a Recognizer|
Idle (listening)|	Unrecognized event|	none	|Idle (listening)
Idle (listening)|	Recognised event  |none	|HandleEvent
|Validator as a Transducer|
HandleEvent|	TransferUnique|	none|	SignTransaction
HandleEvent|	WhitelistNft|	+1 SC address|	Idle (listening)
HandleEvent|	PauseBridge|	none|	Paused
Paused|	UnpauseBridge|	none|	Idle (listening)
HandleEvent|	AddValidator|	+1 Validator|	Idle (listening)
HandleEvent|	RemoveValidator|	-1 Validator|	Idle (listening)
SignTransaction|	Error|	none|	RevertTransaction
SignTransaction|	Success|	PK signature|	Idle (listening)
RevertTransaction|	none|	PK signature|	Idle (listening)

A validator’s on-chain multisignature element resides in the bridge smart contract and acts as an acceptor FSM under the control of the bridge validators. The result largely depends on how many validator signatures for a certain transaction have been collected:

Current State (Sx)|	Input (Ix)|	Output (Ox)|	Next State (S’)
|:---:|:---:|:---:|:---:|
Idle (listening)|	none|	none|	Idle (listening)
Idle (listening)|	Signatures < BFT threshold|	none|	Calculate BFT Threshold
Calculate BFT Threshold|	Signatures < BFT threshold|	none|	Calculate BFT Threshold
Calculate BFT Threshold|	Signature >= BFT threshold|	Release NFT to the destination account|	Idle (listening)

Since the flow of the bridged blockchain events is theoretically unlimited, the entire bridge can be represented as a Turing machine, or a finite-state machine with unlimited memory. This Turing machine reacts to the never-ending string of inputs in the form of events. In turn, bridged blockchains can be described as communicating vessels: if the number of tokens diminishes in one of the vessels, they ought to appear in the same volume and with the same characteristics in the other.