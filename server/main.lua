SR = nil
TriggerEvent('esx:getSharedObject', function(obj) SR = obj end)

SR.RegisterServerCallback('sr_scoreboard:getPlayersJob', function(playerid, cb)
	local lawyerData = SR.GetOnlinePlayerInJob('lawyer', true)
	local lawyer = 0
	local fbi = SR.GetOnlinePlayerInJob('FBI')
	local sheriff = SR.GetOnlinePlayerInJob('sheriff')
	local police = SR.GetOnlinePlayerInJob('police')
	local ambulance = SR.GetOnlinePlayerInJob('ambulance')
	local mecano = SR.GetOnlinePlayerInJob('mecano')
	local taxi = SR.GetOnlinePlayerInJob('taxi')
	for k,v in pairs(lawyerData) do
		local xPlayer = SR.GetPlayerFromId(v)
		if xPlayer.job.grade >= 6 then
			lawyer = lawyer+1
		end
	end
	cb({lawyer = lawyer, fbi = fbi, sheriff = sheriff, police = police, ambulance = ambulance, mecano = mecano, taxi = taxi})
end)

SR.RegisterServerCallback('sr_scoreboard:getPlayersQueue', function(playerid, cb)
	TriggerEvent('Queue:playersInQueue', function(data)
		cb(data)
	end)
end)

SR.RegisterServerCallback('sr_scoreboard:getOnlineAdmins', function(playerid, cb)
	TriggerEvent('esx:getOnlineAdmins', function(data)
		cb(data)
	end)
end)

SR.RegisterServerCallback('sr_scoreboard:getBanksCooldown', function(playerid, cb)
	TriggerEvent('sr_robberybank:getBanksCooldown', function(data)
		cb(data)
	end)
end)

SR.RegisterServerCallback('sr_scoreboard:getJeweleryCooldown', function(playerid, cb)
	TriggerEvent('sr_jeweleryrobb:getJeweleryCooldown', function(data)
		cb(data)
	end)
end)

SR.RegisterServerCallback('sr_scoreboard:getLifeInsuranceCooldown', function(playerid, cb)
	TriggerEvent('sr_lirobbery:getLifeInsuranceCooldown', function(data)
		cb(data)
	end)
end)

SR.RegisterServerCallback('sr_scoreboard:getHyperCooldown', function(playerid, cb)
	TriggerEvent('sr_hyperrobb:getHyperCooldown', function(data)
		cb(data)
	end)
end)