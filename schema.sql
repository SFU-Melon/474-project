CREATE DATABASE db354;

/* Run this before creating the table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    fName VARCHAR(200) NOT NULL,
    lName VARCHAR(200) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(200) NOT NULL,
    joinDate TIMESTAMP NOT NULL,
    profilephoto VARCHAR(200),
    UNIQUE (username)
);

CREATE TABLE plants(
    sciName varchar(200) NOT NULL,
    comName varchar(200) NOT NULL,
    description varchar(2000) NOT NULL,
    plantInstr varchar(2000) NOT NULL,
    growInstr varchar(1000) NOT NULL,
    careInstr varchar(1000) NOT NULL,
    plantphoto VARCHAR(200),
    UNIQUE (sciName)
);

CREATE TABLE posts(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dateTime TIMESTAMP NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    location VARCHAR(200),
    imageurl VARCHAR(200),
    numoflikes INTEGER DEFAULT 0 NOT NULL,
    numofcomments INTEGER DEFAULT 0 NOT NULL,
    authorname VARCHAR(200),
    userid uuid references users(id)
        ON DELETE CASCADE
);

CREATE TABLE likes(
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    val INTEGER, /*Integer restrictued to 1, -1*/
    PRIMARY KEY(userId, postId)
);

CREATE TABLE followers(
    user1 uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    user2 uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comments(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    dateTime TIMESTAMP NOT NULL,
    userid uuid REFERENCES users(id)
        ON DELETE CASCADE,
    postid uuid REFERENCES posts(id)
        ON DELETE CASCADE,
    content TEXT
);

/* Insert 10 plants into plants table */
INSERT INTO plants VALUES 
(
    'Rosa', 


    'Rose', 


    'There is a rose for every garden situation and need, from climbers to adorn a trellis, to miniatures for containers, to long-stemmed types for bouquets. Because of this variety, it''s important to choose carefully. If you are looking for the familiar rose bush, consider hybrid teas, floribundas, or shrub roses. Hybrid teas are tall, long-stemmed roses ideal for cutting. Floribundas are shorter and bloom more freely, setting clusters of blossoms rather than a single bloom on a stem. Both these require regular maintenance for optimum performance. Shrub roses (sometimes called landscape roses), on the other hand, require somewhat less attention, adapt more readily to a wider range of conditions, and offer more disease resistance.',


    'Plant in early spring or fall, depending on your location. Space plants 2 to 3 feet apart, depending on the variety. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost. In regions with cold (below 0F) winters, plant grafted roses so the graft union (which appears as a bulge near the base of the stem) is 1 to 2 inches below the soil line. In warm regions, the graft should be a few inches above the soil line.

For container-grown plants, dig a hole twice the diameter of the pot the plant is in. Carefully remove the plant from its container and place it in the hole. Carefully fill in around the root ball and firm the soil gently. For bare-root roses, dig a hole 12 to 18 inches deep and wide. The hole should be large enough that all the roots can be spread out without touching the sides of the hole. Mound a cone of soil in the center of the hole. Trim off any broken roots, then place the rose in the hole, spreading the roots around the soil mound. Fill the hole half full with soil and water it well to settle the soil and eliminate air pockets. Let the water drain, then fill the remainder of hole with soil and water thoroughly.', 


    'Ideally, roses should be grown in sunny and open locations, with good air circulation at the base of the plant, in rich and well-draining soil. Some roses, notably the old ramblers and the modern hybrid musks, can tolerate some shade in any zone and may even prefer shade in the hottest zones.

Roses require 1-2 inches of water a week to thrive. In dry climates, this water has to be supplied by the gardener, and although overhead watering was once discouraged, it is the logical choice. The water supplied by a gardener supplements rain, which falls from overhead. Overhead watering keeps the foliage and blooms clean, retards powdery mildew, and repels some pests.',


    'Apply a layer of compost under the shrub each spring, followed by a 2-inch layer of mulch to retain moisture and control weeds, keeping mulch a few inches away from the stems. Water plants during the summer if rainfall is less than 1 inch per week. Pruning techniques vary with the type of rose.',


    NULL
),

(
    'Daucus carota subsp. sativus', 


    'Carrot', 


    'Besides tasting good, carrots are packed with nutrients. The saying that carrots are good for your eyes isn''t just an old wives''s tale. Carrots contain a pigment called carotene that converts to vitamin A when you digest it. This vitamin helps us to see in reduced light and at night.

Choose varieties according to use and when you want to harvest. To prolong the harvest, stagger your carrot seed starting, beginning three to four weeks before the average last spring frost date.',


    'To prolong the harvest, stagger plantings at three-week intervals as the soil temperatures rise. Work the carrot seedbed well with a tiller or hoe to break up any soil clumps. Remove all rocks and stones. Sprinkle a thin layer of wood ashes over the seedbed to add potassium to the soil for sweeter carrots. Work the ashes into the top 4 inches of the bed. Then rake the beds smooth. Make furrows 1/4 inch deep, spaced 4 inches apart. Put a 1/4 inch layer of sifted compost or peat moss in the bottom of each furrow and sow the seeds, about 3 per inch, on top. Cover with a 1/2 inch layer of the same material. Lightly mulch the seedbed to retain moisture and prevent soil crusting.',

    
    'Select a site with full sun and deep, well-drained soil. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

Carrots are generally ready for harvest in two to three months, when they are about 1/2 inch in diameter. Leave them in the ground until you need them. Drench the bed with water for easy harvesting. Pull the carrots by grabbing the greens at their crowns and gently tugging with a twisting motion. Harvest carrots for the root cellar after the first hard frost but before the ground freezes.',
    

    'Thin carrots to 3 inches apart. Weed carefully and cultivate lightly near the plants. Add mulch about six weeks after sowing to prevent exposing the roots to the sun, which gives them a bitter taste. Water plants during the summer if rainfall is less than 1 inch per week. Carrots are rarely bothered by pests. Contact your local county extension office for controls of common carrot pests, such as wireworms.',


    NULL
),

(
    'Apium graveolens', 


    'Celery', 


    'Celery requires about 125 days of a long, relatively cool growing season. For a summer harvest, start plants indoors ten to twelve weeks before the last spring frost date. Where the fall climate is mild, try a midsummer seeding in the garden. Some gardeners prefer to blanch celery for a milder taste when eaten raw. If you''re pressed for time, try a self-blanching variety.',


    'Presoak seeds to speed germination, whether you''re starting them indoors or sowing directly in the garden. If starting indoors, sow seeds indoors in small pots or flats. Move to individual containers when they are 2 inches tall. Set out transplants 8 to 10 inches apart in rows 10 inches apart a week or so before your last spring frost date. In areas with a long growing season, sow seeds in the garden at a depth of 1/8 inch in rows 30 to 36 inches apart after soil temperature reaches 60 degrees F.',

    
    'Select a site with full sun and well-drained soil. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

Start harvesting outer stalks when they are 6 to 8 inches tall. Harvest stalks in fall as needed before the ground freezes. Celery can tolerate light frosts.',


    'Thin direct-seeded celery plants to stand 8 to 10 inches apart when they''re 4 to 5 inches tall. Apply a heavy layer of mulch immediately after planting and provide a regular supply of water. Celery is a heavy feeder, so you may want to fertilize plants with compost tea or side-dress plants with rich compost several times during the growing season. Blanch varieties that require it when the plants are 12 inches tall. Contact your local county extension office for controls of common celery pests, such as earwigs.',


    NULL
),

(
    'Solanum melongena', 


    'Eggplant', 


    'Eggplants are attractive, tender herbaceous perennials normally grown as annuals. Their purple flowers and large, purple-tinged leaves combine with colorful fruit to make them a stunning addition for a vegetable or flower garden. Eggplants are a warm-weather crop, thriving in heat and humidity that makes other crops wilt. It''s best to grow eggplants in a part of the garden where you haven''t grown related crops, including tomatoes, potatoes, and peppers, within the last 3 or 4 years. Many pests of eggplants are pests of these related plants too.',


    'Start plants indoors in flats or peat pots about 2 months before the soil warms up in your region, or buy nursery transplants just before planting. Cover planting beds with black plastic to warm heavy clay soils. Set out the transplants when all spring frost danger is past, spacing plants 18 to 24 inches apart.',


    'Select a site with full sun and fertile, well-drained soil. repare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

Most eggplants can be harvested when they are 4 to 5 inches long. The skin should be shiny; dull skin is a sign that the eggplant is overripe. Use a sharp knife and cut the eggplant from the plant, leaving at least 1 inch of stem attached to the fruit.',


    'Add an organic mulch to retain moisture and control weeds after the soil has completely warmed up, about 1 month after setting out transplants. Water plants during the summer if rainfall is less than 1 inch per week. Contact your local County Extension office for controls of common eggplant pests such as flea beetles, Colorado potato beetles, and tomato hornworms.',


    NULL
),

(
    'Solanum lycopersicum', 


    'Tomato', 


    'With hundreds of varieties to choose from, and more being introduced every year, there is a tomato for every garden situation and every personal taste. The size of the fruit is no indication of plant size -- tiny currant tomatoes might grow on huge, vining (indeterminate) plants, while large beefsteak varieties can be found on more manageable bush (determinate) plants. Newer hybrid varieties have been bred for disease resistance, but don''t overlook heirlooms that are famous for their rich flavors. By planting early-, mid-, and late-season varieties, you can extend the harvest.',


    'If you don''t purchase plants, start seeds indoors in flats or pots 6 to 7 weeks before the average last frost date, and set out transplants when the soil is warm and all danger of frost is past. Set up trellises, cages, or stakes at planting time. Dig planting holes 18 to 24 inches apart if you plan to stake or trellis the crops, 36 to 48 inches apart if the plants aren''t trained. Pinch off two or three of the lower branches on the transplant and set the root ball of the plant well into the hole until the remaining lowest leaves are just above the soil surface. The plant will form additional roots along the buried stem. Water generously and keep the plants well watered for a few days.',


    'Select a site with full sun and well-drained soil. In very hot climates, light afternoon shade may help prevent blossom drop. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

For best flavor, harvest tomatoes when they are firm and fully colored. Fruits will continue to ripen if you pick them when they are half-ripe and bring them indoors, but the flavor is often better if you allow fruits to ripen on the vine.',


    'Provide an even supply of water all season. If staking or trellising, prune suckers to allow one or two central stems to grow on staked plants, two or three central stems for trellis systems. Apply a thick layer of organic mulch 4 or 5 weeks after transplanting. Contact your local County Extension office for controls of common tomato insect pests such as tomato hornworms and whiteflies.',


    NULL
),

(
    'Abelmoschus esculentus', 


    'Okra',


    'Okra is considered a southern crop because it thrive in hot weather. However, okra can be grown anywhere, although it bears most abundantly in regions with long, hot summers. Okra is often stewed with tomatoes, deep fried, pickled, boiled or steamed and served with butter, as well as eaten raw, fresh from the garden. Some folks don''t like okra''s gummy quality when it''s boiled or steamed, and it seems to be more popular when combined with other vegetables, fried or pickled.',


    'In warm regions, plant okra directly in the garden when the nights stay above 55 degrees F and the soil has warmed to 65 degrees F to 70 degrees F. In northern areas, start seeds indoors in peat pots several weeks before the soil warms up. Or direct seed through black plastic and cover the rows with plastic tunnels to hold in the heat. To hasten germination, soak seeds overnight in tepid water or freeze them to crack their coats. Sow seeds 1/2 to 1 inch deep, 3 to 4 inches apart. Set out transplants to stand 1 to 2 feet apart in rows 3 to 4 feet apart.',


    'Select a site with full sun, preferably on a southern slope for maximum warmth, and well-drained soil. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

The first pods will be ready in 50 to 60 days. Harvest the pods when still immature (2 to 3 inches long). Pick at least every other day to encourage production. Wear gloves and long sleeves to avoid coming in contact with the irritating spines on the leaves and pods. Use a knife to cut the stem just above the cap.',


    'When the seedlings are about 3 inches tall, thin to stand 1 to 2 feet apart. Provide at least 1 inch of water per week; more in hot, arid regions. When plants are young, cultivate lightly to eliminate weeds. Mulch heavily (4 to 8 inches) to keep weeds down and conserve moisture. Side-dress plants with rich compost. Side-dress three times: after thinning, when the first pods begin to develop, and at least once midway through the growing season. Contact your local County Extension office for controls of common okra pests such as flea beetles.',


    NULL
),

(
    'Capsicum annuum Group', 


    'Bell Pepper',


    'The glistening greens of the leaves and the rainbow of colors of the ripening peppers -- red, yellow, orange, green, brown or purple -- make pepper plants an ornamental, as well as delicious, addition to the garden. Sweet bell peppers go well with just about anything and are wonderful eaten right out of the garden, while the hotter varieties spice up many recipes. Stuffed peppers, pickled peppers, fried peppers -- peppers fit in, deliciously, everywhere. Peppers like warmth, so wait to plant until the soil and air temperature has warmed up reliably.',


    'Plan to set out home grown or purchased transplants after the last spring frost date. Start plants indoors in flats or pots 8 to 10 weeks before the average last frost date. Set hot pepper plants 12 to 15 inches apart, larger bell types 15 to 18 inches apart. Provide windbreaks to minimize transplant shock.',


    'Select a site with full sun and well-drained soil. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost.

Most peppers, except for a few varieties like Sweet Banana, are green when young. Though bell peppers come in many colors, such as red, yellow, and purple, you can eat any of them in the green stage. However, they are sweeter if you let them ripen until the color is fully developed. Harvest by cutting through the stem of each fruit with a knife or with pruners. You can have an almost-continuous harvest from your pepper plants by cutting often, as this encourages the plant to keep blossoming, especially in the beginning of the summer.',


    'Provide deep watering weekly for pepper plants. Support bushy, heavy-yielding plants with 2-foot-high cages, or stake them. Apply heavy organic mulches when summer heat begins to peak. Temperatures over 90 degrees F can cause buds and blossoms to drop; the condition is more serious if humidity is low also. Pests are not a serious concern. However, contact your local County Extension office for controls of common pepper pests such as corn borers, flea beetles, and leaf miners.',


    NULL
),

(
    'Paeonia', 


    'Peony',


    'Peony varieties with huge, double flowers will be the focal point of the garden when they bloom in early summer. Single-flowered types are more subtle and combine well with other perennials. Flower colors include pink, red, white, and yellow, and the plants grow 18 inches to 3 feet tall, depending on the variety. Peonies make an attractive low hedge. However, they can take up to 3 years to mature, and don''t perform well in hot summer climates.',


    'Plant container-grown peonies in spring or fall, spacing plants 2 to 3 feet apart. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost. Dig a hole twice the diameter of the pot the plant is in. Carefully remove the plant from its container and place it in the hole so the top of the root ball is level with the soil surface. Carefully fill in around the root ball and firm the soil gently. Water thoroughly. Plant bare-root peonies in late summer or fall, setting the roots so that the buds are no more than two inches below the soil surface. If you plant them deeper, they may fail to bloom.',


    'Select a site with full sun and moist, well-drained soil.',


    'Apply a thin layer of compost each spring, followed by a 2-inch layer of mulch to retain moisture and control weeds. Water plants during the summer if rainfall is less than 1 inch per week. Stake tall varieties to keep them upright. After the first killing frost, cut stems back to an inch or two above soil line. The first winter, apply a 4- to 6-inch layer of protective mulch after the ground freezes, to prevent roots from being heaved out of the ground by alternate freezing and thawing. Once your peonies are established, annual winter mulching is not necessary. Remove this protective mulch in the spring.',


    NULL
),

(
    'Lilium', 


    'Lily', 


    'Often with large, trumpet- or bowl-shaped flowers borne on tall stems, lilies in full bloom are the focal point of any perennial garden. Numerous types are available in almost any colour except black or blue and can be a single solid colour, spotted, striped or other intricate patterns. Lilies bloom in early summer to fall, depending on the type. Some are extremely fragrant and the vast majority make good cut flowers for large arrangements.',


    'Plant lily bulbs in spring or fall, spacing plants 8 to 18 inches apart, depending on variety. Prepare garden bed by using a garden fork or tiller to loosen soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost. Dig a hole about 6 inches deep and set the bulb in the hole, pointy end up. Fill the hole with soil and firm it gently. Water thoroughly. If hungry voles or mice are a problem, plant lily bulbs in buried wire cages to protect them from getting eaten.',


    'Select a site with full sun to light shade and well-drained soil. Most lilies prefer slightly acidic soil, although L. candidum (the Madonna Lily) prefers slightly alkaline and Martagons often do well with just a dusting of lime.',


    'Apply a thin layer of compost each spring, followed by a 2-inch layer of mulch to retain moisture and control weeds. Water plants during the summer if rainfall is less than 1 inch per week. Stake tall varieties to keep them upright. As flowers fade, dead-head the spent blooms. Once the stem and leaves turn brown at the end of the season, cut back at ground level.',


    NULL
),

(
    'Tulipa', 


    'Tulip',


    'From stately formal plantings to naturalized woodland areas, there''s a type of tulip for every garden setting. Tulips grow best in areas with cold winters, cool springs, and cool summers. The smaller species tulips are reliably perennial, while larger types may need to be replanted every few years. Flower colors include apricot, pink, salmon, red, deep maroon, and white, and flowers may be double, ruffled, fringed, or lily-shaped, depending on the variety. Height ranges from 6 inches to 2 feet. By planting varieties with different bloom times, you can have tulips blooming from early to late spring. Some types are good for forcing into bloom indoors.',


    'Plant tulip bulbs in fall, six to eight weeks before a hard frost is expected and when soils are below 60 degrees F. This is usually during September and October in the north, and October and November in the south. Prepare the garden bed by using a garden fork or tiller to loosen the soil to a depth of 12 to 15 inches, then mix in a 2- to 4-inch layer of compost. Dig a hole about three times as deep as the height of the bulb. Set the bulb in the hole, pointy end up, then cover with soil and press firmly. Space bulbs 4 to 6 inches apart. Water thoroughly after planting. If hungry voles or mice are a problem, plant bulbs in buried wire cages to protect them from getting eaten.',


    'Select a site with full sun to light shade and well-drained soil. Tall varieties should be sheltered from strong winds.',


    'Keep tulips watered during dry spells in the fall. After plants are finished flowering in spring, cut back flower stalks but allow the leaves to die back naturally, hiding the unsightly foliage with annual or perennial plantings. An annual application of compost should provide adequate nutrients. Large varieties may need replanting every few years; small types usually multiply and spread on their own.',


    NULL
);


/*** For testing ***/

/* Delete all rows inside users table */
DELETE FROM users;
/* See all rows inside users table */
SELECT * FROM users;

/* Selecting content and numOflikes from posts table */
SELECT content, numOfLikes FROM posts;
/* Insert user into users */
INSERT INTO users VALUES (uuid_generate_v4(), 'artunzPlantz3', 'password123', 'Artun', 'Cimensel', '1992-12-22', 'artuns3fakeemail@gmail.com', '2008-01-01 00:00:01', NULL);
