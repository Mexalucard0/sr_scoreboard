SR = nil
local Visable = false

Citizen.CreateThread(function()
	while SR == nil do
		TriggerEvent('esx:getSharedObject', function(obj) SR = obj end)
		Citizen.Wait(0)
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		if IsControlJustReleased(0, 57) and IsInputDisabled(0) then
			ToggleScoreBoard()
			Citizen.Wait(1300)
		end
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(300)
		if IsPauseMenuActive() and not IsPaused then
			IsPaused = true
			SendNUIMessage({
				action  = 'close'
			})
		elseif not IsPauseMenuActive() and IsPaused then
			IsPaused = false
		end
	end
end)

function ToggleScoreBoard()
	if Visable then
		SendNUIMessage({action = 'toggle'})
		Visable = not Visable
	else
		Visable = not Visable
		UpdateData()
		-- Toggle
		SendNUIMessage({action = 'toggle'})
	end
end

function UpdateData()
	Citizen.CreateThread(function()
		while Visable do -- Only work thread in visible mode
			-- Update Players
			local Players = GetActivePlayers()
			SendNUIMessage({action = 'updatePlayers', count = #Players})
			-- Update Queue
			SR.TriggerServerCallback('sr_scoreboard:getPlayersQueue', function(data)
				SendNUIMessage({action = 'updateQueue', count = data})
			end)
			-- Update Admins
			SR.TriggerServerCallback('sr_scoreboard:getOnlineAdmins', function(data)
				SendNUIMessage({action = 'updateAdmins', count = data})
			end)
			-- Update Jobs
			SR.TriggerServerCallback('sr_scoreboard:getPlayersJob', function(data)
				SendNUIMessage({action = 'updateInfo', data = data})
			end)
			-- Update Banks CD
			SR.TriggerServerCallback('sr_scoreboard:getBanksCooldown', function(data)
				SendNUIMessage({action = 'updateBanksCd', data = data})
			end)
			-- Update Jewelery CD
			SR.TriggerServerCallback('sr_scoreboard:getJeweleryCooldown', function(data)
				SendNUIMessage({action = 'updateJeweleryCd', data = data})
			end)
			-- Update LifeInsurance CD
			SR.TriggerServerCallback('sr_scoreboard:getLifeInsuranceCooldown', function(data)
				SendNUIMessage({action = 'updateLifeInsuranceCd', data = data})
			end)
			-- Update Hyper CD
			SR.TriggerServerCallback('sr_scoreboard:getHyperCooldown', function(data)
				SendNUIMessage({action = 'updateHyperCd', data = data})
			end)
			Citizen.Wait(5000) -- Update in 5 secound
		end
	end)
end