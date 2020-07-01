var visable = false;
var BankCooldown = false;
var CBankCooldown = false;
var JeweleryCd = false;
var LifeInsuranceCd = false;
var HyperCd = false;

$(function (){
	// Title Fade
	var ih = 0;
	setInterval(function() {
		$('.header h3').fadeOut();
		$(".header h3:eq("+ih+")").fadeIn();
	  	if(ih == 1) {
			ih = 0;
	  	} else {
			ih++;
	  	};
	}, 2000);
	window.addEventListener('message', function(event){
		switch(event.data.action){
			case 'toggle':
				if(visable){
					$('.container').css('height', '0px');
					this.setTimeout(() => {
						$('#wrap').fadeOut();
					}, 1000)
				}else{
					$('#wrap').fadeIn();
					this.setTimeout(() => {
						$('.container').css('height', '200px');
					}, 500)
				};
				visable = !visable;
				break;
			case 'close':
				$('.container').css('height', '0px');
				this.setTimeout(() => {
					$('#wrap').fadeOut();
				}, 1000)
				visable = false;
				break;
			case 'updatePlayers':
				$('#Vcount').html(event.data.count);
				break;
			case 'updateQueue':
				$('#Vqueue').html(event.data.count);
			case 'updateAdmins':
				$('#Vadmins').html(event.data.count);
			case 'updateInfo':
				if(event.data.data){
					var JobData = event.data.data;
					// Jewelery
					Jewelery(JobData.police+JobData.sheriff);
					// LifeInsurance
					LifeInsurance(JobData.fbi+JobData.police+JobData.sheriff)
					// Bank
					Bank(JobData.fbi+JobData.police+JobData.sheriff);
					// Cbank
					CBank(JobData.fbi+JobData.police+JobData.sheriff);
					// Shop
					Shop(JobData.police+JobData.sheriff);
					// Hyper
					Hyper(JobData.police+JobData.sheriff);
					// Online Jobs
					for(var k in JobData){
						if(k != 'fbi'){
							if(k == 'police'){
								if(JobData['police'] <= 5){
									$(`.${k} p`).html(JobData[k]);
								}else{
									$(`.${k} p`).html('+5');
								}
							}else if(k == 'sheriff'){
								if(JobData['sheriff'] <= 5){
									$(`.${k} p`).html(JobData[k]);
								}else{
									$(`.${k} p`).html('+5');
								}
							}else{
								$(`.${k} p`).html(JobData[k]);
							};
						};
					};
				};
				break;
			case 'updateBanksCd':
				if(event.data.data){
					var bdata = event.data.data;
					if(bdata.lastrobbed){
						CBankCooldown = true;
						BankCooldown = true;
					}else{
						if(bdata.CBank != 0 && bdata.CBank < 14400){
							CBankCooldown = true;
							BankCooldown = false;
						}else{
							CBankCooldown = false;
							BankCooldown = false;
						};
					};
				};
				break;
			case 'updateJeweleryCd':
				if(event.data.data != 0 && event.data.data < 6600){
					JeweleryCd = true;
				}else{
					JeweleryCd = false;
				}
				break;
			case 'updateLifeInsuranceCd':
				if(event.data.data != 0 && event.data.data < 14400){
					LifeInsuranceCd = true;
				}else{
					LifeInsuranceCd = false;
				}
				break;
			case 'updateHyperCd':
				if(event.data.data != 0 && event.data.data < 2400){
					HyperCd = true;
				}else{
					HyperCd = false;
				}
				break;
			default:
				console.log('[sr_scoreboard]: Unknown Action!');
				break;
		};
	}, false);
});

function Jewelery(cops){
	if(cops >= 5){
		if(!JeweleryCd){
			$(`.jewelery`).css('border', '2px #ffffff solid');
			$(`.jewelery img`).attr('src', './images/Robb/JewelryActive.png');
			$(`.jewelery`).addClass('glow');
		}else{
			$(`.jewelery`).css('border', '2px #701212 solid');
			$(`.jewelery img`).attr('src', './images/Robb/JewelryDown.png');
			$(`.jewelery`).removeClass('glow');
		};
	}else{
		$(`.jewelery`).css('border', '2px #858585 solid');
		$(`.jewelery img`).attr('src', './images/Robb/JewelryDeactive.png');
		$(`.jewelery`).removeClass('glow');
	};
};

function LifeInsurance(cops){
	if(cops >= 10){
		if(!LifeInsuranceCd){
			$(`.lifeinsurance`).css('border', '2px #ffffff solid');
			$(`.lifeinsurance img`).attr('src', './images/Robb/LifeInsuranceActive.png');
			$(`.lifeinsurance`).addClass('glow');
		}else{
			$(`.lifeinsurance`).css('border', '2px #701212 solid');
			$(`.lifeinsurance img`).attr('src', './images/Robb/LifeInsuranceDown.png');
			$(`.lifeinsurance`).removeClass('glow');
		};
	}else{
		$(`.lifeinsurance`).css('border', '2px #858585 solid');
		$(`.lifeinsurance img`).attr('src', './images/Robb/LifeInsuranceDeactive.png');
		$(`.lifeinsurance`).removeClass('glow');
	};
};

function Bank(cops){
	if(cops >= 8){
		if(!BankCooldown){
			$(`.bank`).css('border', '2px #ffffff solid');
			$(`.bank img`).attr('src', './images/Robb/BankActive.png');
			$(`.bank`).addClass('glow');
		}else{
			$(`.bank`).css('border', '2px #701212 solid');
			$(`.bank img`).attr('src', './images/Robb/BankDown.png');
			$(`.bank`).removeClass('glow');
		};
	}else{
		$(`.bank`).css('border', '2px #858585 solid');
		$(`.bank img`).attr('src', './images/Robb/BankDeactive.png');
		$(`.bank`).removeClass('glow');
	};
};

function CBank(cops){
	if(cops >= 10){
		if(!CBankCooldown){
			$(`.centeralbank`).css('border', '2px #ffffff solid');
			$(`.centeralbank img`).attr('src', './images/Robb/CBankActive.png');
			$(`.centeralbank`).addClass('glow');
		}else{
			$(`.centeralbank`).css('border', '2px #701212 solid');
			$(`.centeralbank img`).attr('src', './images/Robb/CBankDown.png');
			$(`.centeralbank`).removeClass('glow');
		};
	}else{
		$(`.centeralbank`).css('border', '2px #858585 solid');
		$(`.centeralbank img`).attr('src', './images/Robb/CBankDeactive.png');
		$(`.centeralbank`).removeClass('glow');
	};
};

function Shop(cops){
	if(cops >= 4){
		$(`.shop`).css('border', '2px #ffffff solid');
		$(`.shop img`).attr('src', './images/Robb/ShopActive.png');
		$(`.shop`).addClass('glow');
	}else{
		$(`.shop`).css('border', '2px #858585 solid');
		$(`.shop img`).attr('src', './images/Robb/ShopDeactive.png');
		$(`.shop`).removeClass('glow');
	};
};

function Hyper(cops){
	if(cops >= 5){
		if(!HyperCd){
			$(`.hyper`).css('border', '2px #ffffff solid');
			$(`.hyper img`).attr('src', './images/Robb/HyperActive.png');
			$(`.hyper`).addClass('glow');
		}else{
			$(`.hyper`).css('border', '2px #701212 solid');
			$(`.hyper img`).attr('src', './images/Robb/HyperDown.png');
			$(`.hyper`).removeClass('glow');
		};
	}else{
		$(`.hyper`).css('border', '2px #858585 solid');
		$(`.hyper img`).attr('src', './images/Robb/HyperDeactive.png');
		$(`.hyper`).removeClass('glow');
	};
};