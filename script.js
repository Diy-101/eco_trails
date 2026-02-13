document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero__title");
  
  if (!heroTitle) return;
  
  let ticking = false;
  
  function updateParallax() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Параллакс для заголовка - выезжает вверх при скроллинге
    // Чем больше скролл, тем выше поднимается текст
    const parallaxOffset = scrollY * 0.5; // Скорость движения текста
    
    // Ограничиваем движение, чтобы текст не уходил слишком далеко
    const maxOffset = windowHeight * 0.3;
    const offset = Math.min(parallaxOffset, maxOffset);
    
    // Используем translate3d для GPU ускорения
    heroTitle.style.transform = `translate3d(-50%, calc(-50% - ${offset}px), 0)`;
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener("scroll", requestTick, { passive: true });
  
  // Инициализация
  updateParallax();
  
  // Плавная прокрутка к разделам
  const mapButton = document.querySelector('.hero__button--primary');
  const routesButton = document.querySelector('.hero__button--secondary');
  const mapSection = document.getElementById('map-section');
  const routesSection = document.getElementById('routes-section');
  
  if (mapButton && mapSection) {
    mapButton.addEventListener('click', () => {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  if (routesButton && routesSection) {
    routesButton.addEventListener('click', () => {
      routesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  // Данные рекомендуемых маршрутов (карточки в блоке «Рекомендуемые маршруты»)
  const recommendedRoutes = [
    {
      name: "Курголовская",
      subtitle: "этнотропа",
      image: "курголовская этнотропа карточка.png",
      description: "Визуальное путешествие в глубь истории: камовые гряды — древнее дно ледникового озера, Курголовское озеро (Журавлиное), песчаные холмы и сосновый лес, встречающийся с верховым болотом. Эколого-этнографический маршрут во Всеволожском районе. Поднимитесь на один из камовых холмов, и вам откроется потрясающий вид.",
      points: [
        "камовая гряда (древнее дно ледникового озера)",
        "Курголовское озеро",
        "верховое болото",
        "сосновый лес",
        "арт-объекты из вторичного сырья (качели, фотозона из лыж, столбик ботаника)"
      ],
      distance: "2.5 KM",
      timing: "0.5 Ч",
      audioUrl: ""
    },
    {
      name: "Заячья тропа",
      subtitle: "",
      image: "заячья тропа карточка.png",
      description: "Природный концертный зал под открытым небом среди камовых холмов Колтушской возвышенности (30–70 м над уровнем моря). В компании невидимых музыкантов — многоголосьем лесных птиц. Сосновые боры, покрывающие живописные ледниковые холмы, создают идеальную акустику: каждый свист, щебет и трель разносятся между котловинами — естественными амфитеатрами древних термокарстовых впадин. Слух становится главным навигатором.",
      points: [
        "Пундоловское кладбище",
        "камовые холмы (вершина — 70,1 м)",
        "межкамовые котловины и ложбины",
        "сосновые леса памятника природы"
      ],
      distance: "1.5 KM",
      timing: "0.5 Ч",
      audioUrl: ""
    },
    {
      name: "Долина реки",
      subtitle: "Рагуша",
      image: "долина реки рагуша карточка.png",
      description: "Долина реки Рагуша — геологический атлас под открытым небом. История возрастом более 300 миллионов лет: шершавые известняковые стены, гладкие мокрые кальцитовые натёки, прикосновение к кристально чистой воде и древнему каньону. Расположена в Бокситогорском районе близ реки Рудная Горка. Настоящее тактильное путешествие!",
      points: [
        "автомобильный мост через Рагушу",
        "обрывы известняковых бортов долины (высотой до 50 м)",
        "сухое русло",
        "карстовые воронки",
        "поноры (места ухода воды под землю)",
        "воклюзы (выходы подземной реки)"
      ],
      distance: "2.8 KM",
      timing: "50 МИН",
      audioUrl: ""
    },
    {
      name: "Экотропа",
      subtitle: "«Сестрорецкое болото»",
      image: "экотропа сестрорецкое болото карточка.png",
      description: "Гастрономическое приключение: деревянный настил через верховое болото, клюквенные кочки, ягодное разнообразие — брусника, голубика, черника — и чай из болотных трав. Маршрут на территории одноимённого природного заказника. Захватите с собой корзинку!",
      points: [
        "станция Белоостров",
        "входная группа с инфостендом",
        "деревянный настил через верховое болото",
        "клюквенные кочки",
        "смотровые площадки",
        "лесные островки"
      ],
      distance: "12.6 KM",
      timing: "3.5 Ч",
      audioUrl: ""
    },
    {
      name: "Еловые холмы",
      subtitle: "",
      image: "еловые холмы карточка.png",
      description: "Природная парфюмерия: смола, влажная древесина, грибы, зелёный перец, мох, сфагнум болота, багульник, торф. Старовозрастная ель, сосна, лиственница. Экотропа по территории памятника природы «Токсовские высоты». Лес пахнет таёжной свежестью — уникальные хвойные ароматы.",
      points: [
        "ж/д платформа Кавголово",
        "камовые холмы (высота до 103 м)",
        "старовозрастной ельник (деревья до 120 лет)",
        "межкамовые болотные котловины",
        "участки с лиственницей сибирской"
      ],
      distance: "5.5 KM",
      timing: "2 Ч",
      audioUrl: ""
    }
  ];
  
  // Общая логика модального окна карточки маршрута (как в блоке с картой)
  const trailModal = document.getElementById('trailModal');
  const trailModalBody = document.getElementById('trailModalBody');
  const trailModalClose = document.querySelector('.trail-modal__close');
  const trailModalOverlay = document.querySelector('.trail-modal__overlay');
  let currentAudio = null;
  
  function createPopupHTML(trail) {
    const pointsHTML = trail.points && trail.points.length > 0 
      ? trail.points.map(point => `
          <div class="trail-popup__point">
            <div class="trail-popup__point-icon"></div>
            <span class="trail-popup__point-text">${point}</span>
          </div>
        `).join('')
      : '';
    
    return `
      <div class="trail-popup">
        <div class="trail-popup__image-wrapper">
          <img src="${trail.image}" alt="${trail.name}" class="trail-popup__image" />
        </div>
        <div class="trail-popup__content">
          <h3 class="trail-popup__title">
            ${trail.name}
            ${trail.subtitle ? `<span class="trail-popup__subtitle">${trail.subtitle}</span>` : ''}
          </h3>
          <p class="trail-popup__description">${trail.description}</p>
          ${pointsHTML ? `<div class="trail-popup__points">${pointsHTML}</div>` : ''}
          <div class="trail-popup__details">
            <div class="trail-popup__audio">
              <button class="trail-popup__audio-button" type="button" data-audio-url="${trail.audioUrl || ''}">
                <svg class="trail-popup__audio-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
                <div class="trail-popup__audio-waveform">
                  <div class="trail-popup__audio-bar"></div>
                  <div class="trail-popup__audio-bar"></div>
                  <div class="trail-popup__audio-bar"></div>
                  <div class="trail-popup__audio-bar"></div>
                  <div class="trail-popup__audio-bar"></div>
                </div>
              </button>
              <span class="trail-popup__audio-label">АУДИОГИД</span>
            </div>
            <div class="trail-popup__details-group">
              <div class="trail-popup__detail">
                <span class="trail-popup__detail-value">${trail.distance}</span>
                <span class="trail-popup__detail-label">РАССТОЯНИЕ</span>
              </div>
              <div class="trail-popup__detail">
                <span class="trail-popup__detail-value">${trail.timing}</span>
                <span class="trail-popup__detail-label">ТАЙМИНГ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  function openTrailModal(trail) {
    if (!trailModal || !trailModalBody) return;
    trailModalBody.innerHTML = createPopupHTML(trail);
    trailModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    setTimeout(() => {
      const audioButton = trailModalBody.querySelector('.trail-popup__audio-button');
      if (audioButton) {
        audioButton.addEventListener('click', function() {
          const audioUrl = this.dataset.audioUrl;
          if (audioUrl) {
            if (currentAudio && !currentAudio.paused) {
              currentAudio.pause();
              currentAudio = null;
              this.classList.remove('playing');
            } else {
              currentAudio = new Audio(audioUrl);
              currentAudio.play();
              this.classList.add('playing');
              currentAudio.addEventListener('ended', () => { this.classList.remove('playing'); currentAudio = null; });
              currentAudio.addEventListener('error', () => { this.classList.remove('playing'); currentAudio = null; });
            }
          }
        });
      }
    }, 100);
  }
  
  function closeTrailModal() {
    if (!trailModal) return;
    trailModal.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio = null;
    }
  }
  
  if (trailModalClose) trailModalClose.addEventListener('click', closeTrailModal);
  if (trailModalOverlay) trailModalOverlay.addEventListener('click', closeTrailModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && trailModal && trailModal.classList.contains('active')) closeTrailModal();
  });
  
  // Клик по карточке в блоке «Рекомендуемые маршруты» открывает ту же карточку-модалку
  document.querySelectorAll('.route-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const index = parseInt(card.getAttribute('data-card-index'), 10);
      if (!isNaN(index) && recommendedRoutes[index]) {
        openTrailModal(recommendedRoutes[index]);
      }
    });
  });
  
  // Инициализация карты
  const mapContainer = document.getElementById("mapContainer");
  if (mapContainer && typeof L !== "undefined") {
    // Определяем строгие границы для Санкт-Петербурга и Ленинградской области
    const bounds = L.latLngBounds(
      [59.0, 28.0], // Юго-западный угол
      [61.5, 32.5]  // Северо-восточный угол
    );
    
    // Создаем карту с центром в Санкт-Петербурге и строгими ограничениями
    const map = L.map("mapContainer", {
      center: [59.9343, 30.3351],
      zoom: 9,
      minZoom: 8,
      maxZoom: 12,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0, // Полностью блокирует перетаскивание за границы
      worldCopyJump: false, // Отключает "прыжок" карты при перетаскивании
      bounceAtZoomLimits: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      boxZoom: false,
      keyboard: false
    });
    
    // Жесткая блокировка выхода за границы
    map.on('drag', function(e) {
      const center = map.getCenter();
      if (!bounds.contains(center)) {
        map.panInsideBounds(bounds, { animate: false });
      }
    });
    
    map.on('moveend', function() {
      const center = map.getCenter();
      if (!bounds.contains(center)) {
        map.panInsideBounds(bounds, { animate: false });
      }
    });
    
    // Блокируем панорамирование за границы при каждом движении
    map.on('move', function() {
      const center = map.getCenter();
      if (!bounds.contains(center)) {
        map.panInsideBounds(bounds, { animate: false });
      }
    });
    
    // Устанавливаем границы при изменении размера
    map.whenReady(function() {
      map.setMaxBounds(bounds);
    });
    
    // Добавляем тайлы OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
    
    // Примеры локаций экотроп (координаты Санкт-Петербурга и области)
    const ecoTrails = [
      {
        name: "Маршрут в заказнике",
        subtitle: "«Щучье озеро»",
        image: "маршрут в заказнике щучье озеро.png",
        icon: "увидь.png",
        filterType: "look",
        description: "Визуальное путешествие по ландшафтам Карельского перешейка, начинающееся от ст. Комарово, проходит через сосновые и еловые леса, серию живописных озер. Особое внимание привлекают Щучье озеро с песчаными отмелями, темные торфяные воды Черных озер с «плавающими» берегами и глубокие котловины Дружинного и Симагинских озер, обрамленные высокими холмами. Завершается маршрут видом на обширное болото Ламмин-Суо с песчаных холмов — образцовый ландшафт русской природы.",
        points: [
          "ст. Комарово",
          "музей-заповедник «Ялкала» в Ильичёво",
          "оз. Щучье, Дружинное, Большое и Малое Симагинские",
          "болото Ламмин-Суо",
          "дача Анны Ахматовой"
        ],
        distance: "14 KM",
        timing: "3-4Ч",
        audioUrl: "",
        coords: [60.25, 29.85],
        difficulty: "easy",
      },
      {
        name: "Экотропа в заказнике",
        subtitle: "«Западный Котлин»",
        image: "экотропа в заказнике западный котлин.png",
        icon: "услышь.png",
        filterType: "listen",
        description: "Уникальная возможность услышать двойной голос истории и природы. Птичий перекресток с криками чаек, уток и гусей, полифония форта Шанц с шумом ветра, дальним прибоем и эхом в подземных галереях.",
        points: [
          "западный берег Котлина",
          "форт Шанц (Шанец)",
          "смотровая вышка",
          "восточный берег Котлина",
          "форт Риф"
        ],
        distance: "1.5 KM",
        timing: "0.5 Ч",
        audioUrl: "",
        coords: [60.0, 29.7],
        difficulty: "easy",
      },
      {
        name: "Экомаршрут на",
        subtitle: "«Комаровском береге»",
        image: "экомаршрут на комаровском береге.png",
        icon: "потрогай.png",
        filterType: "touch",
        description: "Экомаршрут «Комаровский берег» — это погружение в мир тактильных ощущений, где кожа становится главным проводником. Прогулка начинается с контраста: прохладная, плотная тень густого хвойного леса, где воздух влажен, а мох под ногами пружинит, внезапно сменяется открытым пространством. Здесь вы можете ощутить бархатистое тепло песчаных дюн, ласкающий кожу свежий бриз с Финского залива и почти осязаемую влагу в воздухе у четырёх искусственных прудов. Завершить путь можно, ощутив под ногами упругий ковёр сосновой хвои и прикоснувшись ладонью к шершавой, растрескавшейся коре вековой сосны на берегу.",
        points: [
          "ст. Комарово",
          "восстановленная вилла Рено с парком",
          "четыре искусственных пруда",
          "песчаные дюны и берег Финского залива",
          "сосновый бор"
        ],
        distance: "2.8 KM",
        timing: "50 МИН",
        audioUrl: "",
        coords: [60.2, 29.75],
        difficulty: "easy",
      },
      {
        name: "Экотропа",
        subtitle: "«Гряда Вярямянселькя»",
        image: "экотропа гряда вярменселькя.png",
        icon: "попробуй.png",
        filterType: "taste",
        description: "Маршрут «Гряда Вярямянселькя» — это настоящее гастрономическое путешествие по следам ледника. Прогулка по сухим сосновым лесам и выход к Лебяжьему озеру позволят вам «попробовать на вкус» воздух, наполненный ароматом хвои и лесных трав. Осенью тропа превращается в щедрый стол, где можно собрать полные корзины красноголовиков и подберёзовиков, а в конце пути устроить пикник с шашлыком у озера, наслаждаясь сочетанием дымного аромата и свежего лесного воздуха. Эта прогулка для тех, кто ценит вкус свободы, дикой природы и её даров, которые можно буквально «попробовать на вкус».",
        points: [
          "ст. Петяярви",
          "гряда Вярямянселькя",
          "заброшенная финская ГЭС",
          "лесной питомник Сосновского лесхоза",
          "Лебяжье озеро",
          "Волчья речка"
        ],
        distance: "12.6 KM",
        timing: "3.5 Ч",
        audioUrl: "",
        coords: [60.6, 30.0],
        difficulty: "medium",
      },
      {
        name: "Экомаршрут в",
        subtitle: "Линдуловской роще",
        image: "экомаршрут в линдуловской роще.png",
        icon: "ощути.png",
        filterType: "feel",
        description: "Экомаршрут в Линдуловской роще — это путешествие в мир уникальных ароматов, созданных человеком и временем. Воздух наполнен чистым, смолистым ароматом древних лиственниц, посаженных для кораблей Петра Великого, с нотами хвойных иголок и влажной лесной почвы. Свежее дыхание реки Рощинки и запах преющих листьев создают атмосферу древнего, почти сказочного леса. Этот охраняемый воздух, смешанный с ароматом истории, незабываем.",
        points: [
          "ст. Рощино",
          "посадки лиственниц XVIII-XXI вв.",
          "река Рощинка",
          "остатки финского оборонительного вала",
          "Могила Неизвестного Солдата"
        ],
        distance: "5.5 KM",
        timing: "2 Ч",
        audioUrl: "",
        coords: [60.25, 29.6],
        difficulty: "easy",
      },
    ];
    
    // Создаем маркеры для каждой экотропы (openTrailModal и модалка объявлены выше)
    const markers = [];
    
    // Функция создания кастомной иконки для маркера
    const markerSize = 50;
    const circleSize = 64;

    function createCustomIcon(iconPath) {
      return L.divIcon({
        className: 'map-marker-with-circle',
        html: `
          <span class="map-marker-circle"></span>
          <img src="${iconPath}" alt="" class="map-marker-icon" width="${markerSize}" height="${markerSize}" />
        `,
        iconSize: [circleSize, circleSize],
        iconAnchor: [circleSize / 2, circleSize],
        popupAnchor: [0, -circleSize]
      });
    }

    ecoTrails.forEach((trail) => {
      // Создаем кастомную иконку для каждого маркера
      const customIcon = trail.icon ? createCustomIcon(trail.icon) : undefined;
      const marker = L.marker(trail.coords, { icon: customIcon }).addTo(map);
      marker.trailData = trail;
      markers.push(marker);
      
      // Открываем модальное окно при клике на маркер
      marker.on('click', function() {
        openTrailModal(trail);
      });
    });
    
    // Обработчик фильтра
    const filterButton = document.getElementById("mapFilterButton");
    const filterDropdown = document.getElementById("mapFilterDropdown");
    const filterItems = document.querySelectorAll(".map-filter-dropdown__item");
    
    if (filterButton && filterDropdown) {
      // Открытие/закрытие выпадающего меню
      filterButton.addEventListener("click", (e) => {
        e.stopPropagation();
        filterButton.classList.toggle("active");
        filterDropdown.classList.toggle("active");
      });
      
      // Закрытие меню при клике вне его
      document.addEventListener("click", (e) => {
        if (!filterButton.contains(e.target) && !filterDropdown.contains(e.target)) {
          filterButton.classList.remove("active");
          filterDropdown.classList.remove("active");
        }
      });
      
      // Обработка выбора фильтра
      filterItems.forEach((item) => {
        item.addEventListener("click", () => {
          const filterType = item.dataset.filter;
          
          // Закрываем меню
          filterButton.classList.remove("active");
          filterDropdown.classList.remove("active");
          
          // Находим соответствующий маршрут по типу фильтра
          let targetTrail = null;
          switch(filterType) {
            case "look": // Присмотрись -> Щучье озеро
              targetTrail = ecoTrails.find(trail => trail.name === "Маршрут в заказнике" && trail.subtitle === "«Щучье озеро»");
              break;
            case "listen": // Прислушайся -> Западный Котлин
              targetTrail = ecoTrails.find(trail => trail.name === "Экотропа в заказнике" && trail.subtitle === "«Западный Котлин»");
              break;
            case "taste": // Попробуй -> Гряда Вярямянселькя
              targetTrail = ecoTrails.find(trail => trail.name === "Экотропа" && trail.subtitle === "«Гряда Вярямянселькя»");
              break;
            case "touch": // Прикоснись -> Комаровский берег
              targetTrail = ecoTrails.find(trail => trail.name === "Экомаршрут на" && trail.subtitle === "«Комаровском береге»");
              break;
            case "feel": // Почувствуй -> Линдуловская роща
              targetTrail = ecoTrails.find(trail => trail.name === "Экомаршрут в" && trail.subtitle === "Линдуловской роще");
              break;
          }
          
          // Если нашли маршрут, находим соответствующий маркер и открываем его
          if (targetTrail) {
            const targetMarker = markers.find(marker => 
              marker.trailData.name === targetTrail.name && 
              marker.trailData.subtitle === targetTrail.subtitle
            );
            
            if (targetMarker) {
              // Центрируем карту на маркере
              map.setView(targetMarker.getLatLng(), 11, {
                animate: true,
                duration: 1.0
              });
              
              // Открываем модальное окно с информацией о маршруте
              setTimeout(() => {
                openTrailModal(targetTrail);
              }, 500);
            }
          }
        });
      });
    }
  }
  
  // Исправление высоты фона для routes-section на мобильных устройствах
  function updateRoutesSectionBackground() {
    const routesSection = document.querySelector('.routes-section');
    const routesSectionBackground = document.querySelector('.routes-section__background');
    const routesSectionInner = document.querySelector('.routes-section__inner');
    
    if (routesSection && routesSectionBackground && routesSectionInner && window.innerWidth <= 768) {
      // Получаем высоту внутреннего контента
      const innerHeight = routesSectionInner.offsetHeight;
      const sectionHeight = routesSection.offsetHeight;
      
      // Устанавливаем высоту фона равной высоте секции или контента
      const maxHeight = Math.max(innerHeight, sectionHeight);
      routesSectionBackground.style.height = `${maxHeight}px`;
      routesSection.style.minHeight = `${maxHeight}px`;
    }
  }
  
  // Обновляем при загрузке и изменении размера окна
  if (window.innerWidth <= 768) {
    updateRoutesSectionBackground();
    window.addEventListener('resize', updateRoutesSectionBackground);
    
    // Обновляем после загрузки всех изображений
    window.addEventListener('load', () => {
      setTimeout(updateRoutesSectionBackground, 100);
    });
    
    // Используем MutationObserver для отслеживания изменений в контенте
    const routesSectionInner = document.querySelector('.routes-section__inner');
    if (routesSectionInner) {
      const observer = new MutationObserver(() => {
        updateRoutesSectionBackground();
      });
      observer.observe(routesSectionInner, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
  }
});
